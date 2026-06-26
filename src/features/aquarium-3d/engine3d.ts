import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { clone as skeletonClone } from "three/examples/jsm/utils/SkeletonUtils.js";
import type { Inventory, DecorItem, DecorType } from "../../types";
import { getModel, getHeading, hasModel, type ModelSlot } from "./modelStore";

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

const BOX_W = 8, BOX_H = 5, BOX_D = 5;
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
  private caustic: THREE.Mesh | null = null;
  private causticTex: THREE.CanvasTexture | null = null;

  private waterColor = 0xb8dcd8;
  private sandColor = 0xc8a874;

  // arrange-mode drag
  private arrange = false;
  private onMove: ((id: string, x: number, z: number) => void) | null = null;
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -SAND_TOP_Y);
  private dragging: THREE.Object3D | null = null;

  // tap-to-speak (a fish shows a random example sentence in a bubble)
  private downX = 0;
  private downY = 0;
  private bubbleFish: THREE.Object3D | null = null;
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
    this.camera.position.set(8, 5, 11);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(w, h, false);
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.minDistance = 6;
    this.controls.maxDistance = 20;
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
  start() {
    const loop = (now: number) => {
      this.frame(now);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.ro.disconnect();
    this.cv.removeEventListener("pointerdown", this.onPointerDown);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerup", this.onPointerUp);
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

  setArrange(on: boolean, onMove: (id: string, x: number, z: number) => void) {
    this.arrange = on;
    this.onMove = onMove;
    this.cv.style.cursor = on ? "grab" : "";
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
        const targetMax = slot === "tank" ? BOX_W : (FISH_TYPES as readonly string[]).includes(slot) ? 0.9 : 1.2;
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
      mesh.scale.setScalar(DECOR_SCALE[item.type] ?? 1);
    }
  }

  /* ---------- tank ---------- */
  private buildTank() {
    this.glassMat = new THREE.MeshPhysicalMaterial({
      color: this.waterColor, transparent: true, opacity: 0.15, roughness: 0.05,
      metalness: 0, transmission: 0.95, thickness: 0.6, side: THREE.DoubleSide, depthWrite: false
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

    const surfMat = new THREE.MeshStandardMaterial({ color: 0xeaf5f4, transparent: true, opacity: 0.18, roughness: 0.1 });
    const water = new THREE.Mesh(new THREE.PlaneGeometry(BOX_W - 0.1, BOX_D - 0.1), surfMat);
    water.rotation.x = -Math.PI / 2;
    water.position.y = WATER_Y;
    water.name = "water";
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

    // Caustics: animated bright web on the sand.
    this.causticTex = this.makeCausticTexture();
    this.causticTex.wrapS = this.causticTex.wrapT = THREE.RepeatWrapping;
    this.causticTex.repeat.set(2, 1.5);
    const cMat = new THREE.MeshBasicMaterial({
      map: this.causticTex, transparent: true, opacity: 0.22,
      blending: THREE.AdditiveBlending, depthWrite: false
    });
    this.caustic = new THREE.Mesh(new THREE.PlaneGeometry(BOX_W - 0.2, BOX_D - 0.2), cMat);
    this.caustic.rotation.x = -Math.PI / 2;
    this.caustic.position.y = SAND_TOP_Y + 0.03;
    this.scene.add(this.caustic);
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
        const b = Math.pow(n, 4) * 255;
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
    if (type === "smallFish") return this.makeFishGeneric({ color: 0xe9b955, tail: 0xa17a37, size: 0.1 });
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
    mesh.userData.swim = { speed, vel: dir.multiplyScalar(speed * 0.6), phase: Math.random() * 6 };
    this.fish.push(mesh);
    this.scene.add(mesh);
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
      }
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
    const v = this.bubbleFish.position.clone().project(this.camera);
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
    for (const f of this.fish) {
      const sw = f.userData.swim;
      if (!sw) continue;
      sw.vel.x += (Math.random() - 0.5) * 0.5 * dt;
      sw.vel.y += (Math.random() - 0.5) * 0.3 * dt;
      sw.vel.z += (Math.random() - 0.5) * 0.5 * dt;
      const targ = sw.speed * 0.6;
      sw.vel.multiplyScalar(targ / Math.max(0.001, sw.vel.length()));
      if (f.position.x > halfX) sw.vel.x = -Math.abs(sw.vel.x);
      if (f.position.x < -halfX) sw.vel.x = Math.abs(sw.vel.x);
      if (f.position.y > yTop) sw.vel.y = -Math.abs(sw.vel.y);
      if (f.position.y < yBot) sw.vel.y = Math.abs(sw.vel.y);
      if (f.position.z > halfZ) sw.vel.z = -Math.abs(sw.vel.z);
      if (f.position.z < -halfZ) sw.vel.z = Math.abs(sw.vel.z);
      f.position.addScaledVector(sw.vel, dt);
      if (f.userData.mixer) f.userData.mixer.update(dt);
      sw.phase += dt * 3;
      if (f.userData.type === "turtle") {
        // Jellyfish: stay upright, drift, and pulse the bell (squash-stretch).
        f.rotation.set(0, getHeading("turtle"), 0);
        if (f.userData.bell) {
          const s = Math.sin(sw.phase * 0.7);
          f.userData.bell.scale.set(1 - s * 0.08, 1 + s * 0.15, 1 - s * 0.08);
        }
      } else {
        // Yaw-only turning: face the horizontal swim direction, stay upright
        // (so vertical models like a seahorse don't tip over). The +90° aligns
        // the model's +X (head) with the swim direction.
        const tgt = f.position.clone().add(new THREE.Vector3(sw.vel.x, 0, sw.vel.z));
        f.lookAt(tgt);
        f.rotateY(Math.PI / 2 + getHeading(f.userData.type));
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
    // Caustics drift + breathe.
    if (this.causticTex && this.caustic) {
      this.causticTex.offset.x = (t * 0.012) % 1;
      this.causticTex.offset.y = (t * 0.008) % 1;
      (this.caustic.material as THREE.MeshBasicMaterial).opacity = 0.18 + 0.08 * Math.sin(t * 0.5);
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
