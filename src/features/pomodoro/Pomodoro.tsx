import { useEffect, useState } from "react";
import { useStore } from "../../store";
import { toast } from "../../ui/toast";

const DUR = 25 * 60;

export function Pomodoro() {
  const minutes = useStore((s) => s.today.minutes);
  const grantMinute = useStore((s) => s.grantMinute);
  const [remain, setRemain] = useState(DUR);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setRemain((r) => r - 1), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (remain <= 0) {
      setRunning(false);
      setRemain(DUR);
      grantMinute(25);
      toast("一个番茄已成");
    }
  }, [remain]);

  const mm = String(Math.floor(remain / 60)).padStart(2, "0");
  const ss = String(remain % 60).padStart(2, "0");

  return (
    <div className="pane">
      <div className="timer-display">{mm}:{ss}</div>
      <div className="timer-sub">专注种下海草</div>
      <div className="timer-actions">
        <button className="primary" onClick={() => setRunning((r) => !r)}>
          {running ? "暂停" : remain < DUR ? "继续" : "开始"}
        </button>
        <button
          onClick={() => {
            setRunning(false);
            setRemain(DUR);
          }}
        >
          重置
        </button>
      </div>
      <div className="pom-stat">今日累计 {Math.round(minutes)} 分钟</div>
      <div className="pom-stat">20 分 → 海草 · 40 分 → 海葵 · 60 分 → 珊瑚</div>
    </div>
  );
}
