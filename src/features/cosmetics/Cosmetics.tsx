import { useEffect, useRef, useState } from "react";
import { useStore } from "../../store";
import { toast } from "../../ui/toast";
import { AudioControls } from "../audio/AudioControls";
import {
  initModels,
  subscribeModels,
  hasModel,
  setModel,
  clearModel,
  fileToDataUrl,
  cycleHeading,
  type ModelSlot
} from "../aquarium-3d/modelStore";
import { uploadModelFile, deleteModelFromCloud } from "../../lib/sync";

const FISH_SLOTS = new Set<ModelSlot>(["smallFish", "moonFish", "clownfish", "bigFish", "turtle"]);

const WATER_PRESETS: [number, string][] = [
  [0xb8dcd8, "浅青"], [0x6ba6a3, "深青"], [0xa5cce0, "浅蓝"], [0x3a78a5, "深蓝"], [0x4a5d8a, "暮色"]
];
const SAND_PRESETS: [number, string][] = [
  [0xc8a874, "暖沙"], [0xe8d3a3, "米沙"], [0xddcdb0, "贝壳"], [0x3a342c, "黑沙"]
];

const MODEL_ROWS: [ModelSlot, string][] = [
  ["tank", "缸子"],
  ["smallFish", "小鱼"], ["moonFish", "月亮鱼"], ["clownfish", "小丑鱼"], ["bigFish", "大鱼"], ["turtle", "水母"],
  ["rock", "岩石"], ["coral", "珊瑚"], ["anemone", "海葵"], ["seaweed", "海草"]
];

const hex = (n: number) => "#" + n.toString(16).padStart(6, "0");

export function Cosmetics() {
  const palette = useStore((s) => s.cosmetics.palette);
  const setPalette = useStore((s) => s.setPalette);

  // Reflect model presence (stored outside zustand) reactively.
  const [, bump] = useState(0);
  useEffect(() => {
    initModels().then(() => bump((v) => v + 1));
    return subscribeModels(() => bump((v) => v + 1));
  }, []);

  return (
    <div className="pane">
      <AudioControls />

      <div className="cos-section">
        <h3>海缸配色</h3>
        <div className="cos-row">
          <label>水色</label>
          <div className="palette">
            {WATER_PRESETS.map(([c, name]) => (
              <div
                key={c}
                className={"swatch" + (palette.water === c ? " active" : "")}
                title={name}
                style={{ background: hex(c) }}
                onClick={() => setPalette(c, palette.sand)}
              />
            ))}
          </div>
        </div>
        <div className="cos-row">
          <label>沙色</label>
          <div className="palette">
            {SAND_PRESETS.map(([c, name]) => (
              <div
                key={c}
                className={"swatch" + (palette.sand === c ? " active" : "")}
                title={name}
                style={{ background: hex(c) }}
                onClick={() => setPalette(palette.water, c)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="cos-section">
        <h3>替换为 GLB 模型</h3>
        <div style={{ fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.7, marginBottom: 8 }}>
          在 <a href="https://fab.com" target="_blank" rel="noreferrer">fab.com</a> 搜
          {" "}<code>stylized aquarium</code> / <code>low poly fish</code> / <code>coral</code> 等，筛选「免费 + 可商用」，
          下载 <code>.glb</code> 后在这里上传替换占位模型（自动按大小缩放）。
        </div>
        {MODEL_ROWS.map(([slot, label]) => (
          <ModelRow key={slot} slot={slot} label={label} replaced={hasModel(slot)} />
        ))}
      </div>
    </div>
  );
}

function ModelRow({ slot, label, replaced }: { slot: ModelSlot; label: string; replaced: boolean }) {
  const input = useRef<HTMLInputElement>(null);
  return (
    <div className="cos-row">
      <label>{label}</label>
      <input
        ref={input}
        type="file"
        accept=".glb,.gltf,model/gltf-binary"
        style={{ display: "none" }}
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          try {
            await setModel(slot, await fileToDataUrl(f));
            uploadModelFile(slot, f); // syncs to cloud if signed in
            toast(label + " 模型已替换");
          } catch {
            toast(label + " 模型加载失败");
          }
          e.target.value = "";
        }}
      />
      <button className="file-btn" onClick={() => input.current?.click()}>选择 .glb</button>
      <span className="model-status">{replaced ? "✓ 已替换" : "占位"}</span>
      {replaced && FISH_SLOTS.has(slot) && (
        <button className="file-btn" title="转 90° 调整朝向" onClick={() => { cycleHeading(slot); toast(label + " 转了 90°"); }}>↻</button>
      )}
      {replaced && (
        <button
          className="clear"
          onClick={() => clearModel(slot).then(() => { deleteModelFromCloud(slot); toast(label + " 已恢复占位"); })}
        >
          清除
        </button>
      )}
    </div>
  );
}
