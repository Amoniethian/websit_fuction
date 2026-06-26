import { useSyncExternalStore } from "react";
import { useStore } from "../../store";
import { pomodoro } from "./timer";

const PRESETS = [15, 25, 45, 60];

export function Pomodoro() {
  const minutes = useStore((s) => s.today.minutes);
  const st = useSyncExternalStore(pomodoro.subscribe, pomodoro.getState);

  const mm = String(Math.floor(st.remain / 60)).padStart(2, "0");
  const ss = String(st.remain % 60).padStart(2, "0");
  const curMin = Math.round(st.duration / 60);

  return (
    <div className="pane">
      <div className="timer-display">{mm}:{ss}</div>
      <div className="timer-sub">专注种下海草</div>

      <div className="pomo-presets">
        {PRESETS.map((m) => (
          <button
            key={m}
            className={"pomo-preset" + (curMin === m && !st.running ? " on" : "")}
            onClick={() => pomodoro.setMinutes(m)}
            disabled={st.running}
          >
            {m} 分
          </button>
        ))}
        <input
          type="number"
          min={1}
          max={120}
          value={curMin}
          onChange={(e) => pomodoro.setMinutes(Number(e.target.value))}
          disabled={st.running}
          className="pomo-input"
          aria-label="自定义分钟"
        />
      </div>

      <div className="timer-actions">
        <button className="primary" onClick={() => (st.running ? pomodoro.pause() : pomodoro.start())}>
          {st.running ? "暂停" : st.remain < st.duration ? "继续" : "开始"}
        </button>
        <button onClick={() => pomodoro.reset()}>重置</button>
      </div>

      <div className="pom-stat">今日累计 {Math.round(minutes)} 分钟 · 切页面 / 刷新都不打断计时</div>
      <div className="pom-stat">20 分 → 海草 · 40 分 → 海葵 · 60 分 → 珊瑚</div>
    </div>
  );
}
