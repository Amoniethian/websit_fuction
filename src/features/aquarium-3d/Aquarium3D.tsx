import { useEffect, useRef, useState } from "react";
import { useStore } from "../../store";
import { ICONS } from "../../lib/icons";
import { AmbientToggle } from "../audio/AudioControls";
import { Aquarium3D as Engine } from "./engine3d";
import { initModels, subscribeModels } from "./modelStore";

export function Aquarium3D({
  viewMode,
  onToggleView
}: {
  viewMode: boolean;
  onToggleView: () => void;
}) {
  const inv = useStore((s) => s.inv);
  const tankDecor = useStore((s) => s.tankDecor);
  const palette = useStore((s) => s.cosmetics.palette);
  const moveDecor = useStore((s) => s.moveDecor);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const [arrange, setArrange] = useState(false);

  // Create the engine once.
  useEffect(() => {
    if (!canvasRef.current) return;
    const engine = new Engine(canvasRef.current);
    engineRef.current = engine;
    engine.setPalette(palette.water, palette.sand);
    engine.setDecor(tankDecor);
    engine.setFish(inv);
    engine.start();
    initModels().then(() => engine.loadAllModels());
    const unsub = subscribeModels((slot) => engine.refreshModel(slot));
    return () => {
      unsub();
      engine.dispose();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => { engineRef.current?.setFish(inv); }, [inv]);
  useEffect(() => { engineRef.current?.setDecor(tankDecor); }, [tankDecor]);
  useEffect(() => { engineRef.current?.setPalette(palette.water, palette.sand); }, [palette.water, palette.sand]);
  useEffect(() => { engineRef.current?.setAutoRotate(autoRotate && !arrange); }, [autoRotate, arrange]);
  useEffect(() => {
    engineRef.current?.setArrange(arrange, (id, x, z) => moveDecor(id, x, z));
  }, [arrange, moveDecor]);

  return (
    <main className="aquarium-wrap">
      <div className="aq-head">
        <h2>海 缸</h2>
        <div className="aq-head-right">
          <button
            className={"aq-btn" + (autoRotate ? " on" : "")}
            title="自动旋转"
            onClick={() => setAutoRotate((v) => !v)}
          >
            ⟳ 自转
          </button>
          <button
            className={"aq-btn" + (arrange ? " on" : "")}
            title="布置模式：拖动造景到新位置"
            onClick={() => setArrange((v) => !v)}
          >
            ✥ 布置
          </button>
          <button className="aq-btn" title={viewMode ? "退出观赏" : "观赏模式：隐藏面板、专心看缸"} onClick={onToggleView}>
            {viewMode ? "✕ 退出" : "◉ 观赏"}
          </button>
          <AmbientToggle />
        </div>
      </div>
      <div className="canvas-frame canvas-3d">
        <canvas ref={canvasRef} />
        <div className="aq-hint">{arrange ? "布置中：拖动缸里的造景摆放" : "左键拖动旋转 · 滚轮缩放"}</div>
      </div>
      <div className="medal-shelf">
        {inv.medals.map((m, i) => (
          <div key={i} className="medal" title={`${m.label} × ${m.n}`}>
            {ICONS[m.type] || "✦"}
          </div>
        ))}
      </div>
    </main>
  );
}
