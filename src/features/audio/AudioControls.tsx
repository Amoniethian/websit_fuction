import { audio } from "../../lib/audio";
import { useAudioSettings } from "./useAudio";

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      className={"switch" + (on ? " on" : "")}
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
    >
      <span className="knob" />
    </button>
  );
}

/** Audio settings block, shown in the 外观 tab. */
export function AudioControls() {
  const s = useAudioSettings();
  return (
    <div className="cos-section">
      <h3>声音</h3>
      <div className="audio-row">
        <label>环境音 · BGM</label>
        <Toggle on={s.ambientOn} onChange={(v) => audio.setSettings({ ambientOn: v })} />
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(s.ambientVol * 100)}
          onChange={(e) => audio.setSettings({ ambientVol: +e.target.value / 100 })}
          aria-label="环境音音量"
        />
      </div>
      <div className="audio-row">
        <label>反馈音</label>
        <Toggle on={s.fxOn} onChange={(v) => audio.setSettings({ fxOn: v })} />
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(s.fxVol * 100)}
          onChange={(e) => audio.setSettings({ fxVol: +e.target.value / 100 })}
          aria-label="反馈音音量"
        />
      </div>
      <div style={{ fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.7 }}>
        环境音是深海白噪 + 缓慢和声垫；反馈音用于答对 / 答错、新生物诞生、番茄结束、整套掌握。
        浏览器要求首次交互后才能发声。
      </div>
    </div>
  );
}

/** Compact ambient on/off button for the aquarium header. */
export function AmbientToggle() {
  const s = useAudioSettings();
  return (
    <button
      className="ambient-toggle"
      title={s.ambientOn ? "关闭环境音" : "开启环境音"}
      onClick={() => {
        audio.ensure();
        audio.setSettings({ ambientOn: !s.ambientOn });
      }}
    >
      {s.ambientOn ? "🌊 BGM" : "🔇 BGM"}
    </button>
  );
}
