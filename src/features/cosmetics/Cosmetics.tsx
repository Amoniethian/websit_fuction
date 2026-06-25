import { useRef } from "react";
import { useStore } from "../../store";
import type { CreatureType } from "../../types";
import { toast } from "../../ui/toast";
import { AudioControls } from "../audio/AudioControls";

const CREATURES: [CreatureType, string][] = [
  ["smallFish", "小鱼"], ["moonFish", "月亮鱼"], ["clownfish", "小丑鱼"], ["bigFish", "大鱼"],
  ["turtle", "海龟"], ["seaweed", "海草"], ["anemone", "海葵"], ["coral", "珊瑚"]
];

function readFile(f: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(f);
  });
}

export function Cosmetics() {
  const cosmetics = useStore((s) => s.cosmetics);
  const setBackground = useStore((s) => s.setBackground);
  const setCreatureImage = useStore((s) => s.setCreatureImage);
  const bgInput = useRef<HTMLInputElement>(null);

  return (
    <div className="pane">
      <AudioControls />
      <div className="cos-section">
        <h3>海缸背景</h3>
        <div className="cos-row">
          <label>背景图</label>
          <input
            ref={bgInput}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setBackground(await readFile(f));
              toast("背景已更新");
            }}
          />
          <button className="file-btn" onClick={() => bgInput.current?.click()}>选择图片</button>
          <div
            className="cos-preview"
            style={{ backgroundImage: cosmetics.background ? `url(${cosmetics.background})` : "" }}
          />
          <button className="clear" onClick={() => setBackground(null)}>清除</button>
        </div>
        <div style={{ fontSize: 11, color: "var(--ink-soft)" }}>建议 16:10 横图；留空则使用默认渐变。</div>
      </div>
      <div className="cos-section">
        <h3>物种形象（PNG / SVG，透明背景最佳）</h3>
        {CREATURES.map(([k, label]) => (
          <CreatureRow
            key={k}
            label={label}
            url={cosmetics.creatures[k]}
            onPick={async (f) => {
              setCreatureImage(k, await readFile(f));
              toast(label + " 已更新");
            }}
            onClear={() => setCreatureImage(k, null)}
          />
        ))}
      </div>
    </div>
  );
}

function CreatureRow({
  label,
  url,
  onPick,
  onClear
}: {
  label: string;
  url: string | null;
  onPick: (f: File) => void;
  onClear: () => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  return (
    <div className="cos-row">
      <label>{label}</label>
      <input
        ref={input}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onPick(f);
        }}
      />
      <button className="file-btn" onClick={() => input.current?.click()}>选择</button>
      <div className="cos-preview" style={{ backgroundImage: url ? `url(${url})` : "" }} />
      <button className="clear" onClick={onClear}>清除</button>
    </div>
  );
}
