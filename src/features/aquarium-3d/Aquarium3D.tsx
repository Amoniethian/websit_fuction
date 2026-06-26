import { useEffect, useRef, useState } from "react";
import { useStore } from "../../store";
import { ICONS } from "../../lib/icons";
import { HighlightedEN } from "../../lib/sentence";
import { AmbientToggle } from "../audio/AudioControls";
import { Aquarium3D as Engine, type Spoken } from "./engine3d";
import { initModels, subscribeModels } from "./modelStore";
import { DECOR_SIZES, DECOR_ROTS, type DecorType } from "../../types";

const DECOR_LABEL: Record<DecorType, string> = {
  rock: "岩石",
  coral: "珊瑚",
  anemone: "海葵",
  seaweed: "海草"
};
const TAU = Math.PI * 2;

/** Pick a random example sentence from a learned word, for the fish to "speak". */
function randomLearnedSentence(): Spoken | null {
  const vocab = useStore.getState().vocab;
  const pool = vocab.filter((w) => w.learned && w.sentences.length > 0);
  if (!pool.length) return null;
  const w = pool[Math.floor(Math.random() * pool.length)];
  const s = w.sentences[Math.floor(Math.random() * w.sentences.length)];
  return { en: s.en, zh: s.zh, word: w.word };
}

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
  const setDecorScale = useStore((s) => s.setDecorScale);
  const setDecorRot = useStore((s) => s.setDecorRot);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const [arrange, setArrange] = useState(false);
  const [bubble, setBubble] = useState<Spoken | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = arrange ? tankDecor.find((d) => d.id === selectedId) ?? null : null;

  // Create the engine once.
  useEffect(() => {
    if (!canvasRef.current) return;
    const engine = new Engine(canvasRef.current);
    engineRef.current = engine;
    engine.setPalette(palette.water, palette.sand);
    engine.setDecor(tankDecor);
    engine.setFish(inv);
    engine.setSentenceProvider(randomLearnedSentence);
    engine.setOnBubble(setBubble);
    engine.start();
    initModels().then(() => engine.loadAllModels());
    const unsub = subscribeModels((slot) => engine.refreshModel(slot));
    return () => {
      unsub();
      engine.dispose();
      engineRef.current = null;
    };
  }, []);

  // While a bubble is shown, follow the fish each frame (via ref, no re-render).
  useEffect(() => {
    if (!bubble) return;
    let raf = 0;
    const place = () => {
      const p = engineRef.current?.projectBubble();
      const el = bubbleRef.current;
      if (p && el) {
        el.style.left = p.x + "px";
        el.style.top = p.y + "px";
        el.style.opacity = "1";
      } else if (el) {
        el.style.opacity = "0";
      }
    };
    place(); // position synchronously on first paint, before the first frame
    const follow = () => {
      place();
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);
    // Auto-dismiss after ~12s (tapping another fish resets this).
    const dismiss = window.setTimeout(() => setBubble(null), 12000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(dismiss);
    };
  }, [bubble]);

  useEffect(() => { engineRef.current?.setFish(inv); }, [inv]);
  useEffect(() => { engineRef.current?.setDecor(tankDecor); }, [tankDecor]);
  useEffect(() => { engineRef.current?.setPalette(palette.water, palette.sand); }, [palette.water, palette.sand]);
  useEffect(() => { engineRef.current?.setAutoRotate(autoRotate && !arrange); }, [autoRotate, arrange]);
  useEffect(() => {
    engineRef.current?.setArrange(
      arrange,
      (id, x, z) => moveDecor(id, x, z),
      (id) => setSelectedId(id)
    );
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
        {bubble && (
          <div ref={bubbleRef} className="fish-bubble" onClick={() => setBubble(null)}>
            <div className="fb-en"><HighlightedEN en={bubble.en} word={bubble.word || ""} /></div>
            <div className="fb-zh">{bubble.zh}</div>
          </div>
        )}
        <div className="aq-hint">
          {arrange
            ? selected
              ? "已选中：调大小 / 朝向，或拖动摆放"
              : "布置中：点一下缸里的造景来选中它"
            : "点一下鱼，它会说一句例句 · 拖动旋转"}
        </div>
        {selected && (
          <div className="arrange-panel">
            <div className="ap-title">{DECOR_LABEL[selected.type]}</div>
            <div className="ap-group">
              <span className="ap-label">大小</span>
              {DECOR_SIZES.map((s) => (
                <button
                  key={s.key}
                  className={"ap-btn" + ((selected.scale ?? 1) === s.scale ? " on" : "")}
                  onClick={() => setDecorScale(selected.id, s.scale)}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="ap-group">
              <span className="ap-label">朝向</span>
              {DECOR_ROTS.map((r) => (
                <button
                  key={r.label}
                  className={"ap-btn" + (Math.abs((((selected.rot % TAU) + TAU) % TAU) - r.rot) < 0.01 ? " on" : "")}
                  onClick={() => setDecorRot(selected.id, r.rot)}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        )}
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
