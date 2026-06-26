import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone as skeletonClone } from "three/examples/jsm/utils/SkeletonUtils.js";
import type { Inventory, DecorItem, DecorType } from "../../types";
import { getModel, getHeading, getPitch, hasModel, type ModelSlot } from "./modelStore";

type ModelTemplate = { object: THREE.Object3D; animations: THREE.AnimationClip[] };
export type Spoken = { en: string; zh: string; word?: string };

/**
 * 3D glass aquarium, ported from legacy/cihai-3d-preview.html and extended:
 *  - decor placed by persistent id (drag-to-arrange)
 *  - fish reconciled to inventory counts (they swim)
 *  - any slot (fish / decor / whole tank) replaceable by an uploaded GLB
 *
 * Coordinates are cleaned up vs the prototype so the sand sits on the tank
 * floor and decor rests on the sand.
 */

const BOX_W = 12, BOX_H = 5, BOX_D = 5;
const AQ_Y = BOX_H / 2 - 2;                 // tank centre: 0.5
const TANK_BOTTOM = AQ_Y - BOX_H / 2;       // -2
const SAND_THICK = 0.5;
const SAND_TOP_Y = TANK_BOTTOM + SAND_THICK; // -1.5
const SAND_CENTER_Y = TANK_BOTTOM + SAND_THICK / 2;
const WATER_Y = AQ_Y + BOX_H / 2 - 0.1;      // 2.9

const FISH_TYPES = ["smallFish", "moonFish", "clownfish", "bigFish", "turtle"] as const;
type FishType = (typeof FISH_TYPES)[number];

const DECOR_X = (BOX_W / 2) - 1.0;  // placement clamp
const DECOR_Z = (BOX_D / 2) - 0.9;

const DECOR_SCALE: Partial<Record<DecorType, number>> = { coral: 2.5 };

// Fit target (max bounding-box dimension) for an uploaded fish model. Default
// 0.6; per-type overrides let some creatures read larger.
const FISH_FIT_DEFAULT = 0.6;
const FISH_FIT: Partial<Record<FishType, number>> = { moonFish: 1.08 };

// Creatures that school together (counted jointly toward the 3+ threshold).
const SCHOOL_TYPES: ReadonlySet<string> = new Set(["smallFish", "moonFish"]);

function lowPolyMat(color: number) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0, flatShading: true });
}

export class Aquarium3D {
  private cv: HTMLCanvasElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private loader = new GLTFLoader();
  private raf = 0;
  private ro: ResizeObserver;
  private last = performance.now();

  private glassMat!: THREE.MeshPhysicalMaterial;
  private sandMat!: THREE.MeshStandardMaterial;
  private tankGroup = new THREE.Group();      // procedural glass + edges + water
  private sandMesh!: THREE.Mesh;
  private customTank: THREE.Object3D | null = null;
  private dir!: THREE.DirectionalLight;

  private fish: THREE.Object3D[] = [];
  private decorMeshes = new Map<string, THREE.Object3D>();
  private decorItems: DecorItem[] = [];
  private models: Partial<Record<ModelSlot, ModelTemplate>> = {};

  // atmosphere
  private bubbles: { mesh: THREE.Mesh; speed: number; phase: number }[] = [];
  private causticLayers: { tex: THREE.CanvasTexture; mat: THREE.MeshBasicMaterial; sx: number; sy: number; baseOp: number; rate: number }[] = [];
  private waterMesh: THREE.Mesh | null = null;
  private causticLight: THREE.SpotLight | null = null;
  private causticLightTex: THREE.CanvasTexture | null = null;
  // reusable temps for the swim loop (avoid per-frame allocation / GC jank)
  private _v1 = new THREE.Vector3();
  private _v2 = new THREE.Vector3();

  private waterColor = 0xb8dcd8;
  private sandColor = 0xc8a874;

  // arrange-mode drag
  private arrange = false;
  private onMove: ((id: string, x: number, z: number) => void) | null = null;
  private onSelect: ((id: string | null) => void) | null = null;
  private selectedId: string | null = null;
  private outline: THREE.BoxHelper | null = null;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -SAND_TOP_Y);
  private dragging: THREE.Object3D | null = null;

  // tap-to-speak (a fish shows a random example sentence in a bubble)
  private downX = 0;
  private downY = 0;
  private bubbleFish: THREE.Object3D | null = null;
  private bubbleBox = new THREE.Box3();
  private bubbleAnchor = new THREE.Vector3();
  private sentenceProvider: (() => Spoken | null) | null = null;
  private onBubble: ((s: Spoken | null) => void) | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.cv = canvas;
    const wrap = canvas.parentElement!;
    const w = wrap.clientWidth || 600;
    const h = wrap.clientHeight || 400;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    this.camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    this.camera.position.set(9, 6, 18);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(w, h, false);
    // Cap at 1.5 — on high-DPI phones/tablets this roughly halves the pixels
    // versus 2× and keeps the calm aquarium smooth.
    this.renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio || 1));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.minDistance = 6;
    this.controls.maxDistance = 32;
    this.controls.minPolarAngle = Math.PI / 7;
    this.controls.maxPolarAngle = Math.PI / 2.1;
    this.controls.target.set(0, 0.4, 0);
    this.controls.autoRotate = false;
    this.controls.autoRotateSpeed = 0.6;

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    this.dir = new THREE.DirectionalLight(0xfff0d0, 0.85);
    this.dir.position.set(3, 9, 4);
    this.dir.castShadow = true;
    this.dir.shadow.mapSize.set(1024, 1024);
    Object.assign(this.dir.shadow.camera, { near: 1, far: 30, left: -8, right: 8, top: 8, bottom: -8 });
    this.scene.add(this.dir);
    const fill = new THREE.DirectionalLight(0xb8d8e8, 0.25);
    fill.position.set(-3, 2, 5);
    this.scene.add(fill);

    this.scene.add(this.tankGroup);
    this.buildTank();
    this.buildAtmosphere();

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(wrap);

    canvas.addEventListener("pointerdown", this.onPointerDown);
    window.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("pointerup", this.onPointerUp);
  }

  /* ---------- public API ---------- */
  private loop = (now: number) => {
    this.frame(now);
    this.raf = requestAnimationFrame(this.loop);
  };
  // Pause the render loop while the tab/page is hidden (saves CPU + battery).
  private onVisibility = () => {
    if (document.hidden) {
      if (this.raf) { cancelAnimationFrame(this.raf); this.raf = 0; }
    } else if (!this.raf) {
      this.raf = requestAnimationFrame(this.loop);
    }
  };
  start() {
    document.addEventListener("visibilitychange", this.onVisibility);
    this.raf = requestAnimationFrame(this.loop);
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    document.removeEventListener("visibilitychange", this.onVisibility);
    this.ro.disconnect();
    this.cv.removeEventListener("pointerdown", this.onPointerDown);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerup", this.onPointerUp);
    if (this.outline) this.outline.geometry.dispose();
    this.renderer.dispose();
  }

  setPalette(water: number, sand: number) {
    this.waterColor = water;
    this.sandColor = sand;
    if (this.glassMat) this.glassMat.color.setHex(water);
    if (this.sandMat) this.sandMat.color.setHex(sand);
  }

  setAutoRotate(on: boolean) {
    this.controls.autoRotate = on;
  }

  setArrange(
    on: boolean,
    onMove: (id: string, x: number, z: number) => void,
    onSelect?: (id: string | null) => void
  ) {
    this.arrange = on;
    this.onMove = onMove;
    this.onSelect = onSelect ?? null;
    this.cv.style.cursor = on ? "grab" : "";
    if (!on) this.select(null); // leaving arrange clears the highlight
  }

  /** Select a decor item (or null) and draw a highlight outline around it. */
  private select(id: string | null) {
    this.selectedId = id;
    this.refreshOutline();
    this.onSelect?.(id);
  }

  /** (Re)build the selection outline to match the selected mesh. */
  private refreshOutline() {
    if (this.outline) {
      this.scene.remove(this.outline);
      this.outline.geometry.dispose();
      this.outline = null;
    }
    if (!this.selectedId) return;
    const mesh = this.decorMeshes.get(this.selectedId);
    if (!mesh) return;
    this.outline = new THREE.BoxHelper(mesh, 0xffcf6b);
    (this.outline.material as THREE.LineBasicMaterial).transparent = true;
    (this.outline.material as THREE.LineBasicMaterial).opacity = 0.9;
    this.scene.add(this.outline);
  }

  /** Load all uploaded models present in storage, then rebuild affected objects. */
  async loadAllModels() {
    const slots: ModelSlot[] = [...FISH_TYPES, "rock", "coral", "anemone", "seaweed", "tank"];
    await Promise.all(slots.filter((s) => hasModel(s)).map((s) => this.refreshModel(s, false)));
    this.rebuildAllFish();
    this.rebuildAllDecor();
    this.applyTankModel();
  }

  async refreshModel(slot: ModelSlot, rebuild = true) {
    const url = await getModel(slot);
    if (!url) {
      delete this.models[slot];
    } else {
      try {
        const { scene, animations } = await this.loadGLB(url);
        const targetMax = slot === "tank"
          ? BOX_W
          : (FISH_TYPES as readonly string[]).includes(slot)
            ? (FISH_FIT[slot as FishType] ?? FISH_FIT_DEFAULT)
            : 1.2;
        this.fit(scene, targetMax);
        scene.traverse((m) => {
          if ((m as THREE.Mesh).isMesh) {
            m.castShadow = true;
            m.receiveShadow = true;
          }
        });
        this.models[slot] = { object: scene, animations };
      } catch {
        delete this.models[slot];
      }
    }
    if (rebuild) {
      if (slot === "tank") this.applyTankModel();
      else if ((FISH_TYPES as readonly string[]).includes(slot)) this.rebuildFishType(slot as FishType);
      else this.rebuildDecorType(slot as DecorType);
    }
  }

  setFish(inv: Inventory) {
    for (const type of FISH_TYPES) {
      const desired = (inv as any)[type] as number;
      const have = this.fish.filter((f) => f.userData.type === type);
      let diff = desired - have.length;
      while (diff > 0) { this.spawnFish(type); diff--; }
      while (diff < 0) { this.removeOneFish(type); diff++; }
    }
  }

  setDecor(items: DecorItem[]) {
    this.decorItems = items;
    const ids = new Set(items.map((d) => d.id));
    for (const [id, mesh] of this.decorMeshes) {
      if (!ids.has(id)) {
        this.scene.remove(mesh);
        this.decorMeshes.delete(id);
      }
    }
    for (const item of items) {
      let mesh = this.decorMeshes.get(item.id);
      if (!mesh) {
        mesh = this.makeDecor(item.type);
        mesh.userData.decorType = item.type;
        this.decorMeshes.set(item.id, mesh);
        this.scene.add(mesh);
      }
      mesh.position.set(item.x, SAND_TOP_Y, item.z);
      mesh.rotation.y = item.rot;
      mesh.scale.setScalar((DECOR_SCALE[item.type] ?? 1) * (item.scale ?? 1));
    }
    // Keep the selection outline matched to the (possibly resized) item.
    if (this.selectedId) this.refreshOutline();
  }

  /* ---------- tank ---------- */
  private buildTank() {
    this.glassMat = new THREE.MeshPhysicalMaterial({
      color: this.waterColor, transparent: true, opacity: 0.15, roughness: 0.05,
      metalness: 0, transmission: 0.95, thickness: 0.5, ior: 1.3,
      clearcoat: 0.2, clearcoatRoughness: 0.1,
      side: THREE.DoubleSide, depthWrite: false
    });
    const glass = new THREE.Mesh(new THREE.BoxGeometry(BOX_W, BOX_H, BOX_D), this.glassMat);
    glass.position.y = AQ_Y;
    this.tankGroup.add(glass);

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(BOX_W, BOX_H, BOX_D)),
      new THREE.LineBasicMaterial({ color: 0x2c4a4d, transparent: true, opacity: 0.45 })
    );
    edges.position.y = AQ_Y;
    this.tankGroup.add(edges);

    const surfMat = new THREE.MeshStandardMaterial({
      color: 0xeaf5f4, transparent: true, opacity: 0.18, roughness: 0.08, metalness: 0.1
    });
    const water = new THREE.Mesh(new THREE.PlaneGeometry(BOX_W - 0.1, BOX_D - 0.1), surfMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = WATER_Y;
    water.name = "water";
    this.waterMesh = water;
    this.tankGroup.add(water);

    // Sand floor with a gentle bump.
    this.sandMat = new THREE.MeshStandardMaterial({ color: this.sandColor, roughness: 0.95, flatShading: true });
    const sandGeom = new THREE.BoxGeometry(BOX_W - 0.1, SAND_THICK, BOX_D - 0.1, 20, 1, 12);
    const pos = sandGeom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      if (pos.getY(i) > 0) {
        const x = pos.getX(i), z = pos.getZ(i);
        pos.setY(i, SAND_THICK / 2 + Math.sin(x * 0.8 + z * 0.6) * 0.06 + Math.cos(x * 0.5 - z * 0.9) * 0.05);
      }
    }
    sandGeom.computeVertexNormals();
    this.sandMesh = new THREE.Mesh(sandGeom, this.sandMat);
    this.sandMesh.position.y = SAND_CENTER_Y;
    this.sandMesh.receiveShadow = true;
    this.scene.add(this.sandMesh);
  }

  private applyTankModel() {
    if (this.customTank) {
      this.scene.remove(this.customTank);
      this.customTank = null;
    }
    const m = this.models.tank;
    if (m) {
      this.customTank = m.object.clone(true);
      this.customTank.position.y = AQ_Y;
      this.scene.add(this.customTank);
      this.tankGroup.visible = false; // hide procedural glass + water
    } else {
      this.tankGroup.visible = true;
    }
  }

  /* ---------- atmosphere: bubbles + god rays + caustics ---------- */
  private buildAtmosphere() {
    // Rising bubbles
    const bubbleMat = new THREE.MeshStandardMaterial({
      color: 0xeaffff, roughness: 0.1, transparent: true, opacity: 0.35
    });
    for (let i = 0; i < 26; i++) {
      const r = 0.02 + Math.random() * 0.05;
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, 6, 5), bubbleMat);
      mesh.position.set(
        (Math.random() - 0.5) * (BOX_W - 1.4),
        TANK_BOTTOM + Math.random() * BOX_H,
        (Math.random() - 0.5) * (BOX_D - 1.4)
      );
      this.scene.add(mesh);
      this.bubbles.push({ mesh, speed: 0.2 + Math.random() * 0.4, phase: Math.random() * 6 });
    }

    // Caustics: two overlapping bright webs drifting at different scales/speeds,
    // so the light on the sand shimmers (波光粼粼) instead of sliding rigidly.
    const causticSpecs = [
      { repeat: [2, 1.5], y: 0.03, op: 0.38, sx: 0.012, sy: 0.008, rate: 0.5 },
      { repeat: [3.2, 2.4], y: 0.05, op: 0.26, sx: -0.018, sy: 0.011, rate: 0.8 }
    ];
    for (const spec of causticSpecs) {
      const tex = this.makeCausticTexture();
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(spec.repeat[0], spec.repeat[1]);
      const mat = new THREE.MeshBasicMaterial({
        map: tex, transparent: true, opacity: spec.op,
        blending: THREE.AdditiveBlending, depthWrite: false
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(BOX_W - 0.2, BOX_D - 0.2), mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = SAND_TOP_Y + spec.y;
      this.scene.add(mesh);
      this.causticLayers.push({ tex, mat, sx: spec.sx, sy: spec.sy, baseOp: spec.op, rate: spec.rate });
    }

    // A downward caustic projector (light cookie) so the shimmer dapples
    // EVERYTHING — rocks, coral, plants, fish — not just the flat sand.
    const projTex = this.makeCausticTexture();
    projTex.wrapS = projTex.wrapT = THREE.RepeatWrapping;
    projTex.repeat.set(2.4, 2.4);
    const sl = new THREE.SpotLight(0xeafcff, 4, 0, Math.PI / 3.4, 0.7, 0);
    sl.position.set(0.4, AQ_Y + BOX_H + 1.5, 0.4);
    sl.target.position.set(0, SAND_TOP_Y, 0);
    sl.castShadow = true;
    sl.shadow.mapSize.set(512, 512); // smaller shadow → much cheaper; cookie still reads fine
    sl.shadow.camera.near = 1;
    sl.shadow.camera.far = 20;
    sl.map = projTex;
    this.scene.add(sl);
    this.scene.add(sl.target);
    this.causticLight = sl;
    this.causticLightTex = projTex;
  }

  private makeCausticTexture(): THREE.CanvasTexture {
    const size = 256;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d")!;
    const img = ctx.createImageData(size, size);
    // Sum of integer-frequency sine waves so the pattern tiles seamlessly.
    const waves: { nx: number; ny: number; ph: number }[] = [];
    for (let k = 0; k < 6; k++) {
      const nx = (1 + Math.floor(Math.random() * 3)) * (Math.random() < 0.5 ? -1 : 1);
      const ny = (1 + Math.floor(Math.random() * 3)) * (Math.random() < 0.5 ? -1 : 1);
      waves.push({ nx, ny, ph: Math.random() * Math.PI * 2 });
    }
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let v = 0;
        for (const w of waves) {
          v += Math.sin((w.nx * x / size + w.ny * y / size) * Math.PI * 2 + w.ph);
        }
        const n = Math.max(0, v / waves.length * 0.5 + 0.5);
        const b = Math.pow(n, 3) * 255;
        const i = (y * size + x) * 4;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = 255;
        img.data[i + 3] = b;
      }
    }
    ctx.putImageData(img, 0, 0);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  /* ---------- factories ---------- */
  private makeFishGeneric(o: { color: number; tail: number; size: number; stripe?: boolean }): THREE.Group {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.SphereGeometry(o.size, 7, 5), lowPolyMat(o.color));
    body.scale.set(1.6, 0.9, 0.7);
    body.castShadow = true;
    g.add(body);
    const tail = new THREE.Mesh(new THREE.ConeGeometry(o.size * 0.6, o.size * 0.8, 4), lowPolyMat(o.tail));
    tail.position.set(-o.size * 1.6, 0, 0);
    tail.rotation.z = -Math.PI / 2;
    g.add(tail);
    g.userData.tail = tail;
    const fin = new THREE.Mesh(new THREE.ConeGeometry(o.size * 0.35, o.size * 0.5, 3), lowPolyMat(o.tail));
    fin.position.set(-o.size * 0.1, o.size * 0.6, 0);
    fin.rotation.x = Math.PI / 8;
    g.add(fin);
    for (const dz of [-1, 1]) {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(o.size * 0.1, 6, 4), new THREE.MeshBasicMaterial({ color: 0x1a1410 }));
      eye.position.set(o.size * 0.9, o.size * 0.15, dz * o.size * 0.45);
      g.add(eye);
    }
    if (o.stripe) {
      for (const x of [-o.size * 0.4, o.size * 0.2]) {
        const s = new THREE.Mesh(new THREE.RingGeometry(o.size * 0.6, o.size * 0.7, 16, 1), new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide }));
        s.rotation.y = Math.PI / 2;
        s.position.set(x, 0, 0);
        g.add(s);
      }
    }
    return g;
  }

  // The "turtle" reward slot is rendered as a jellyfish: translucent bell + tentacles.
  private makeJellyfish(): THREE.Group {
    const g = new THREE.Group();
    const bell = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 12, 7, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: 0xdcaed6, roughness: 0.3, transparent: true, opacity: 0.6, flatShading: true })
    );
    bell.castShadow = true;
    g.add(bell);
    g.userData.bell = bell;
    const tentMat = new THREE.MeshStandardMaterial({ color: 0xe7c6e6, transparent: true, opacity: 0.7, flatShading: true });
    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * Math.PI * 2;
      const t = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.022, 0.5, 4), tentMat);
      t.position.set(Math.cos(ang) * 0.18, -0.26, Math.sin(ang) * 0.18);
      t.rotation.z = Math.cos(ang) * 0.2;
      t.rotation.x = Math.sin(ang) * 0.2;
      g.add(t);
    }
    g.userData.jellyfish = true;
    return g;
  }

  private makeRock(): THREE.Group {
    const g = new THREE.Group();
    const rock = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5 + Math.random() * 0.3, 0), lowPolyMat(0x35353a));
    rock.scale.set(1, 0.7 + Math.random() * 0.3, 1);
    rock.position.y = 0.25;
    rock.rotation.set(Math.random(), Math.random(), Math.random());
    rock.castShadow = true;
    rock.receiveShadow = true;
    g.add(rock);
    return g;
  }
  private makeCoral(): THREE.Group {
    const g = new THREE.Group();
    const palette = [0xe07a8a, 0xd97aa0, 0xea9bb0, 0xc35878];
    const color = palette[Math.floor(Math.random() * palette.length)];
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 0.7, 6), lowPolyMat(color));
    trunk.position.y = 0.35;
    trunk.castShadow = true;
    g.add(trunk);
    for (let i = 0; i < 4; i++) {
      const ang = (i / 4) * Math.PI * 2;
      const branch = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 0.35, 5), lowPolyMat(color));
      branch.position.set(Math.cos(ang) * 0.18, 0.55, Math.sin(ang) * 0.18);
      branch.rotation.set(0.5, ang, 0);
      g.add(branch);
      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.09, 6, 4), lowPolyMat(0xfac0d0));
      tip.position.set(Math.cos(ang) * 0.32, 0.78, Math.sin(ang) * 0.32);
      g.add(tip);
    }
    return g;
  }
  private makeAnemone(): THREE.Group {
    const g = new THREE.Group();
    const palette = [0xd97aa0, 0xea9bb0, 0xc54f8a, 0xe6a8c0];
    const color = palette[Math.floor(Math.random() * palette.length)];
    const base = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 5, 0, Math.PI * 2, 0, Math.PI / 2), lowPolyMat(color));
    g.add(base);
    for (let i = 0; i < 14; i++) {
      const ang = (i / 14) * Math.PI * 2;
      const t = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.05, 0.4, 4), lowPolyMat(color));
      t.position.set(Math.cos(ang) * 0.22, 0.22, Math.sin(ang) * 0.22);
      t.rotation.set(Math.sin(ang) * 0.5, 0, Math.cos(ang) * 0.5);
      g.add(t);
    }
    return g;
  }
  private makeSeaweed(): THREE.Group {
    const g = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.25, 4), lowPolyMat(0x4d8a4d));
      seg.position.y = i * 0.22 + 0.12;
      seg.rotation.z = Math.sin(i * 0.6) * 0.15;
      g.add(seg);
    }
    g.userData.seaweed = true;
    return g;
  }

  /** Clone a GLB template into a group, wiring up its animation mixer if it has clips. */
  private instantiateModel(tpl: ModelTemplate): THREE.Group {
    const m = skeletonClone(tpl.object);
    const g = new THREE.Group();
    g.add(m);
    if (tpl.animations.length) {
      const mixer = new THREE.AnimationMixer(m);
      for (const clip of tpl.animations) mixer.clipAction(clip).play();
      g.userData.mixer = mixer;
    }
    return g;
  }

  private makeDecor(type: DecorType): THREE.Group {
    if (this.models[type]) return this.instantiateModel(this.models[type]!);
    if (type === "rock") return this.makeRock();
    if (type === "coral") return this.makeCoral();
    if (type === "anemone") return this.makeAnemone();
    return this.makeSeaweed();
  }

  private makeFish(type: FishType): THREE.Group {
    if (this.models[type]) return this.instantiateModel(this.models[type]!);
    if (type === "smallFish") return this.makeFishGeneric({ color: 0xe9b955, tail: 0xa17a37, size: 0.05 });
    if (type === "moonFish") return this.makeFishGeneric({ color: 0xe7d9b0, tail: 0xa99b76, size: 0.32 });
    if (type === "clownfish") return this.makeFishGeneric({ color: 0xe07a3c, tail: 0x8e3f17, size: 0.22, stripe: true });
    if (type === "bigFish") return this.makeFishGeneric({ color: 0xbb6abf, tail: 0x7e468a, size: 0.42 });
    return this.makeJellyfish();
  }

  /* ---------- spawn / rebuild ---------- */
  private spawnFish(type: FishType) {
    const mesh = this.makeFish(type);
    mesh.userData.type = type;
    const x = (Math.random() - 0.5) * (BOX_W - 1.6);
    const y = AQ_Y + (Math.random() - 0.5) * 1.6;
    const z = (Math.random() - 0.5) * (BOX_D - 1.6);
    mesh.position.set(x, y, z);
    const speed = type === "bigFish" || type === "turtle" ? 0.3 : type === "moonFish" ? 0.5 : 0.8;
    const dir = new THREE.Vector3((Math.random() - 0.5) * 2, 0, (Math.random() - 0.5) * 2).normalize();
    mesh.userData.swim = {
      speed,
      vel: dir.clone().multiplyScalar(speed * 0.5),
      phase: Math.random() * 6,
      wDir: dir.clone(),          // smoothly-wandering desired heading
      dSpeed: speed * 0.5,        // current (eased) speed
      spdPhase: Math.random() * 6,
      dart: 0,                    // dart-burst countdown (seconds)
      behavior: "cruise",         // cruise(长行) / play(短行) / explore(探索) / cling(依附)
      bTimer: 1 + Math.random() * 6,
      targetMesh: null            // decor being explored / clung to
    };
    this.assignBehavior(mesh);
    this.fish.push(mesh);
    this.scene.add(mesh);
  }

  /** Pick a decor mesh to visit (optionally preferring a type, e.g. anemone). */
  private pickDecor(prefer?: DecorType): THREE.Object3D | null {
    const arr = [...this.decorMeshes.values()];
    if (!arr.length) return null;
    if (prefer) {
      const p = arr.filter((m) => m.userData.decorType === prefer);
      if (p.length) return p[(Math.random() * p.length) | 0];
    }
    return arr[(Math.random() * arr.length) | 0];
  }

  /**
   * Roll the next behaviour for a fish:
   *  - seahorse (bigFish) / jellyfish (turtle): always cruise (长行).
   *  - clownfish: only short trips (短行), exploring (探索) and clinging (依附)
   *    to decor — preferring anemones.
   *  - schooling fish: mostly cruise with the shoal; occasionally a solo short
   *    trip or a decor exploration, then back to cruise.
   */
  private assignBehavior(f: THREE.Object3D) {
    const sw = f.userData.swim;
    const type = f.userData.type as FishType;
    sw.targetMesh = null;
    if (type === "bigFish" || type === "turtle") {
      sw.behavior = "cruise";
      sw.bTimer = 999;
      return;
    }
    if (type === "clownfish") {
      const r = Math.random();
      if (r < 0.45) { sw.behavior = "cling"; sw.bTimer = 7 + Math.random() * 6; sw.targetMesh = this.pickDecor("anemone") || this.pickDecor(); }
      else if (r < 0.75) { sw.behavior = "explore"; sw.bTimer = 4 + Math.random() * 4; sw.targetMesh = this.pickDecor(); }
      else { sw.behavior = "play"; sw.bTimer = 3 + Math.random() * 3; }
      return;
    }
    // Schooling fish: after a side-quest always return to cruise; from cruise,
    // venture out only occasionally.
    if (sw.behavior && sw.behavior !== "cruise") {
      sw.behavior = "cruise";
      sw.bTimer = 10 + Math.random() * 10;
      return;
    }
    const r = Math.random();
    if (r < 0.74) { sw.behavior = "cruise"; sw.bTimer = 10 + Math.random() * 10; }
    else if (r < 0.88) { sw.behavior = "play"; sw.bTimer = 3 + Math.random() * 4; }
    else { sw.behavior = "explore"; sw.bTimer = 5 + Math.random() * 5; sw.targetMesh = this.pickDecor(); }
  }

  private removeOneFish(type: FishType) {
    const idx = this.fish.findIndex((f) => f.userData.type === type);
    if (idx >= 0) {
      this.scene.remove(this.fish[idx]);
      this.fish.splice(idx, 1);
    }
  }
  private rebuildFishType(type: FishType) {
    const n = this.fish.filter((f) => f.userData.type === type).length;
    for (let i = 0; i < n; i++) this.removeOneFish(type);
    for (let i = 0; i < n; i++) this.spawnFish(type);
  }
  private rebuildAllFish() {
    for (const t of FISH_TYPES) this.rebuildFishType(t);
  }
  private rebuildDecorType(type: DecorType) {
    for (const item of this.decorItems) {
      if (item.type !== type) continue;
      const old = this.decorMeshes.get(item.id);
      if (old) {
        this.scene.remove(old);
        this.decorMeshes.delete(item.id);
      }
    }
    this.setDecor(this.decorItems);
  }
  private rebuildAllDecor() {
    for (const mesh of this.decorMeshes.values()) this.scene.remove(mesh);
    this.decorMeshes.clear();
    this.setDecor(this.decorItems);
  }

  /* ---------- GLB helpers ---------- */
  private async loadGLB(dataUrl: string): Promise<{ scene: THREE.Object3D; animations: THREE.AnimationClip[] }> {
    const buf = await (await fetch(dataUrl)).arrayBuffer();
    return new Promise((resolve, reject) => {
      this.loader.parse(buf, "", (g) => resolve({ scene: g.scene, animations: g.animations || [] }), reject);
    });
  }
  private fit(obj: THREE.Object3D, targetMax: number) {
    const box = new THREE.Box3().setFromObject(obj);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = targetMax / maxDim;
    obj.scale.setScalar(scale);
    const center = box.getCenter(new THREE.Vector3()).multiplyScalar(scale);
    obj.position.sub(center);
    // sit base near origin so decor rests on the sand
    obj.position.y += (size.y * scale) / 2;
  }

  /* ---------- arrange drag ---------- */
  private setPointer(e: PointerEvent) {
    const r = this.cv.getBoundingClientRect();
    this.pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    this.pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1;
  }
  private onPointerDown = (e: PointerEvent) => {
    this.downX = e.clientX;
    this.downY = e.clientY;
    if (!this.arrange) return;
    this.setPointer(e);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects([...this.decorMeshes.values()], true);
    if (hits.length) {
      const top = [...this.decorMeshes.entries()].find(([, m]) => this.isAncestor(m, hits[0].object));
      if (top) {
        this.dragging = top[1];
        this.dragging.userData.id = top[0];
        this.controls.enabled = false;
        this.cv.style.cursor = "grabbing";
        this.select(top[0]); // selecting highlights it; dragging still moves it
      }
    } else {
      this.select(null); // tap empty water → deselect
    }
  };
  private isAncestor(anc: THREE.Object3D, node: THREE.Object3D): boolean {
    let n: THREE.Object3D | null = node;
    while (n) {
      if (n === anc) return true;
      n = n.parent;
    }
    return false;
  }
  private onPointerMove = (e: PointerEvent) => {
    if (!this.arrange || !this.dragging) return;
    this.setPointer(e);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hit = new THREE.Vector3();
    if (this.raycaster.ray.intersectPlane(this.dragPlane, hit)) {
      const x = THREE.MathUtils.clamp(hit.x, -DECOR_X, DECOR_X);
      const z = THREE.MathUtils.clamp(hit.z, -DECOR_Z, DECOR_Z);
      this.dragging.position.x = x;
      this.dragging.position.z = z;
      this.outline?.update();
    }
  };
  private onPointerUp = (e: PointerEvent) => {
    if (this.dragging) {
      const id = this.dragging.userData.id as string;
      this.onMove?.(id, this.dragging.position.x, this.dragging.position.z);
      this.dragging = null;
      this.controls.enabled = true;
      this.cv.style.cursor = this.arrange ? "grab" : "";
      return;
    }
    if (this.arrange) return;
    // A tap (not an orbit drag) selects a fish to speak.
    const moved = Math.hypot(e.clientX - this.downX, e.clientY - this.downY);
    if (moved < 6) this.handleTap(e);
  };

  private handleTap(e: PointerEvent) {
    this.setPointer(e);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(this.fish, true);
    if (hits.length) {
      const top = this.fish.find((f) => this.isAncestor(f, hits[0].object)) || null;
      this.bubbleFish = top;
      const sentence = top ? (this.sentenceProvider?.() ?? null) : null;
      this.onBubble?.(sentence);
    } else {
      // tap empty water → dismiss
      this.bubbleFish = null;
      this.onBubble?.(null);
    }
  }

  setSentenceProvider(fn: () => Spoken | null) {
    this.sentenceProvider = fn;
  }
  setOnBubble(fn: (s: Spoken | null) => void) {
    this.onBubble = fn;
  }
  /** Screen position (canvas px) of the speaking fish, or null. */
  projectBubble(): { x: number; y: number } | null {
    if (!this.bubbleFish || !this.fish.includes(this.bubbleFish)) {
      if (this.bubbleFish) {
        this.bubbleFish = null;
        this.onBubble?.(null);
      }
      return null;
    }
    // Anchor a point ABOVE the fish's bounding box (in world space) so the
    // bubble clears the fish at any zoom level, regardless of how small it is.
    this.bubbleBox.setFromObject(this.bubbleFish);
    const top = this.bubbleAnchor.set(
      this.bubbleFish.position.x,
      this.bubbleBox.max.y + 0.3,
      this.bubbleFish.position.z
    );
    const v = top.project(this.camera);
    if (v.z > 1) return null;
    const r = this.cv.getBoundingClientRect();
    return { x: (v.x * 0.5 + 0.5) * r.width, y: (-v.y * 0.5 + 0.5) * r.height };
  }

  /* ---------- loop ---------- */
  private frame(now: number) {
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    const halfX = BOX_W / 2 - 0.7, halfZ = BOX_D / 2 - 0.7;
    const yTop = AQ_Y + BOX_H / 2 - 0.7, yBot = TANK_BOTTOM + 0.7;

    // Small fish + moon fish school together once there are 3+ between them:
    // gather the shared centre and average heading for cohesion/alignment/separation.
    const school = this.fish.filter((f) => f.userData.swim && SCHOOL_TYPES.has(f.userData.type));
    const schooling = school.length >= 3;
    let schoolCenter: THREE.Vector3 | null = null;
    let schoolVel: THREE.Vector3 | null = null;
    if (schooling) {
      schoolCenter = new THREE.Vector3();
      schoolVel = new THREE.Vector3();
      for (const f of school) {
        schoolCenter.add(f.position);
        schoolVel.add(f.userData.swim.vel);
      }
      schoolCenter.multiplyScalar(1 / school.length);
      schoolVel.multiplyScalar(1 / school.length);
    }

    const desired = this._v1;
    for (const f of this.fish) {
      const sw = f.userData.swim;
      if (!sw) continue;
      const type = f.userData.type as FishType;

      // --- behaviour state machine: 长行 / 短行 / 探索 / 依附 ---
      sw.bTimer -= dt;
      if (sw.targetMesh && !sw.targetMesh.parent) sw.targetMesh = null; // decor removed
      if (sw.bTimer <= 0) this.assignBehavior(f);
      const beh: string = sw.behavior;

      // --- desired heading: smooth wander (gentle yaw drift + a little pitch) ---
      const yaw = (Math.random() - 0.5) * 1.7 * dt;
      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      const nx = sw.wDir.x * cy - sw.wDir.z * sy;
      const nz = sw.wDir.x * sy + sw.wDir.z * cy;
      sw.wDir.set(nx, sw.wDir.y + (Math.random() - 0.5) * 0.5 * dt, nz);
      sw.wDir.y *= 0.96; // bias toward horizontal
      sw.wDir.normalize();
      desired.copy(sw.wDir);

      let faceTarget: THREE.Vector3 | null = null;
      let speedScale = 1;
      const visiting = beh === "explore" || beh === "cling";

      if (beh === "cruise" && schooling && SCHOOL_TYPES.has(type)) {
        // 长行: travel with the shoal — cohesion + alignment + separation.
        desired.addScaledVector(this._v2.copy(schoolCenter!).sub(f.position), 0.45);
        desired.addScaledVector(this._v2.copy(schoolVel!).normalize(), 0.7);
        for (const o of school) {
          if (o === f) continue;
          const d = f.position.distanceTo(o.position);
          if (d > 0 && d < 0.6) desired.addScaledVector(this._v2.copy(f.position).sub(o.position).divideScalar(d), ((0.6 - d) / 0.6) * 1.4);
        }
      } else if (visiting && sw.targetMesh) {
        // 探索 / 依附: swim to a piece of decor, then hover, face it and nuzzle.
        const to = this._v2.copy(sw.targetMesh.position);
        to.y += 0.5; // aim a touch above the base
        const hoverX = to.x, hoverY = to.y, hoverZ = to.z;
        to.sub(f.position);
        const dist = to.length();
        const near = beh === "cling" ? 0.55 : 0.95;
        if (dist > near) {
          desired.copy(to).divideScalar(dist).multiplyScalar(1.8); // head toward it
        } else {
          faceTarget = this._v2.set(hoverX, hoverY, hoverZ); // look at the decor
          const nudge = Math.sin(sw.spdPhase * 3) * 0.5;      // gentle in/out bump
          desired.set(hoverX - f.position.x, hoverY - f.position.y, hoverZ - f.position.z);
          if (desired.lengthSq() > 1e-6) desired.normalize().multiplyScalar(nudge);
          speedScale = 0.16; // basically hover
        }
      }
      // play (短行) and cruise for seahorse/jellyfish just wander.

      // --- soft wall avoidance: curve inward as a wall nears (no hard bounce) ---
      const m = 1.3, my = 0.7;
      if (f.position.x > halfX - m) desired.x -= ((f.position.x - (halfX - m)) / m) * 1.6;
      if (f.position.x < -halfX + m) desired.x += ((-f.position.x - (halfX - m)) / m) * 1.6;
      if (f.position.z > halfZ - m) desired.z -= ((f.position.z - (halfZ - m)) / m) * 1.6;
      if (f.position.z < -halfZ + m) desired.z += ((-f.position.z - (halfZ - m)) / m) * 1.6;
      if (f.position.y > yTop - my) desired.y -= ((f.position.y - (yTop - my)) / my) * 1.4;
      // Floor avoidance — skipped while visiting decor so they can dip to the sand.
      if (!visiting && f.position.y < yBot + my) desired.y += (((yBot + my) - f.position.y) / my) * 1.4;
      if (desired.lengthSq() > 1e-4) desired.normalize();

      // --- speed eases up/down; free-roaming fast fish occasionally dart ---
      sw.spdPhase += dt * 0.5;
      const freeRoam = beh === "cruise" || beh === "play";
      if (sw.dart > 0) sw.dart -= dt;
      else if (freeRoam && sw.speed >= 0.5 && Math.random() < 0.004) sw.dart = 0.3 + Math.random() * 0.5;
      const ease = 0.5 + 0.32 * Math.sin(sw.spdPhase) + (sw.dart > 0 ? 1.0 : 0);
      const targetSpeed = sw.speed * Math.max(0.18, ease) * speedScale;
      sw.dSpeed += (targetSpeed - sw.dSpeed) * Math.min(1, 1.8 * dt);
      desired.multiplyScalar(sw.dSpeed);

      // --- steer velocity toward desired (momentum → smooth banking turns) ---
      const resp = Math.min(1, (sw.dart > 0 ? 4.5 : 2.4) * dt);
      sw.vel.x += (desired.x - sw.vel.x) * resp;
      sw.vel.y += (desired.y - sw.vel.y) * resp;
      sw.vel.z += (desired.z - sw.vel.z) * resp;

      f.position.addScaledVector(sw.vel, dt);
      // Safety backstop so nobody ever slips through the glass.
      f.position.x = THREE.MathUtils.clamp(f.position.x, -halfX, halfX);
      f.position.y = THREE.MathUtils.clamp(f.position.y, yBot, yTop);
      f.position.z = THREE.MathUtils.clamp(f.position.z, -halfZ, halfZ);

      if (f.userData.mixer) f.userData.mixer.update(dt);
      // Tail/undulation keeps pace with how fast the fish is actually swimming.
      sw.phase += dt * (2 + 4 * (sw.dSpeed / Math.max(0.01, sw.speed)));
      if (f.userData.type === "turtle") {
        // Jellyfish: stay upright, drift, and pulse the bell (squash-stretch).
        f.rotation.set(0, getHeading("turtle"), 0);
        if (f.userData.bell) {
          const s = Math.sin(sw.phase * 0.7);
          f.userData.bell.scale.set(1 - s * 0.08, 1 + s * 0.15, 1 - s * 0.08);
        }
      } else {
        // Yaw-only turning, staying upright (so a vertical model like a seahorse
        // doesn't tip over). Face the decor when hovering at it, else the swim
        // direction. The +90° aligns the model's +X (head) with that direction.
        if (faceTarget) {
          f.lookAt(faceTarget.x, f.position.y, faceTarget.z);
        } else {
          f.lookAt(this._v1.set(f.position.x + sw.vel.x, f.position.y, f.position.z + sw.vel.z));
        }
        f.rotateY(Math.PI / 2 + getHeading(type));
        // Upright correction (rolls a model that was authored lying on its side).
        const pitch = getPitch(type);
        if (pitch) f.rotateX(pitch);
        // Refined swim: gentle snaking yaw + soft roll + a tail that leads.
        f.rotateY(Math.sin(sw.phase * 0.9) * 0.07);
        f.rotateZ(Math.sin(sw.phase * 1.1) * 0.04);
        if (f.userData.tail) f.userData.tail.rotation.x = Math.sin(sw.phase + 0.5) * 0.35;
      }
    }
    // Animated decor (e.g. a swaying GLB anemone).
    for (const m of this.decorMeshes.values()) {
      if (m.userData.mixer) (m.userData.mixer as THREE.AnimationMixer).update(dt);
    }

    // Bubbles rise + wobble, recycle at the surface.
    const t = now * 0.001;
    for (const b of this.bubbles) {
      b.mesh.position.y += b.speed * dt;
      b.mesh.position.x += Math.sin(t + b.phase) * 0.12 * dt;
      if (b.mesh.position.y > WATER_Y) {
        b.mesh.position.y = TANK_BOTTOM + 0.2;
        b.mesh.position.x = (Math.random() - 0.5) * (BOX_W - 1.4);
        b.mesh.position.z = (Math.random() - 0.5) * (BOX_D - 1.4);
      }
    }
    // Caustics drift + breathe (each layer at its own pace → live shimmer).
    for (let i = 0; i < this.causticLayers.length; i++) {
      const L = this.causticLayers[i];
      L.tex.offset.x = (t * L.sx) % 1;
      L.tex.offset.y = (t * L.sy) % 1;
      L.mat.opacity = L.baseOp * (0.7 + 0.45 * Math.sin(t * L.rate + i * 1.7));
    }
    // Gentle sparkle on the water surface.
    if (this.waterMesh) {
      (this.waterMesh.material as THREE.MeshStandardMaterial).opacity = 0.16 + 0.06 * Math.sin(t * 0.8);
    }
    // Projector caustics drift + breathe (dapples every object below).
    if (this.causticLight && this.causticLightTex) {
      this.causticLightTex.offset.x = (t * 0.015) % 1;
      this.causticLightTex.offset.y = (t * 0.01) % 1;
      this.causticLight.intensity = 2.4 + 1.0 * Math.sin(t * 0.6);
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private resize() {
    const wrap = this.cv.parentElement!;
    const w = wrap.clientWidth, h = wrap.clientHeight;
    if (!w || !h) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  }
}
