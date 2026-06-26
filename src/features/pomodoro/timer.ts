import { useStore } from "../../store";
import { audio } from "../../lib/audio";
import { toast } from "../../ui/toast";

/**
 * Module-level pomodoro timer.
 *
 * Lives for the whole app session (not tied to any component), so the
 * countdown keeps running when you switch to other tabs (e.g. keep learning).
 * The duration is adjustable and remembered in localStorage.
 */

export type PomoState = { duration: number; remain: number; running: boolean };

const KEY = "cihai-pomo-min";
function loadMin(): number {
  const v = Number(localStorage.getItem(KEY) || "25");
  return v >= 1 && v <= 120 ? v : 25;
}

let duration = loadMin() * 60;
let state: PomoState = { duration, remain: duration, running: false };
const listeners = new Set<(s: PomoState) => void>();
let interval: number | undefined;

function set(patch: Partial<PomoState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l(state));
}

function tick() {
  if (state.remain <= 1) {
    window.clearInterval(interval);
    interval = undefined;
    const mins = Math.round(duration / 60);
    useStore.getState().grantMinute(mins);
    audio.pomodoroEnd();
    toast("一个番茄已成");
    set({ running: false, remain: duration });
  } else {
    set({ remain: state.remain - 1 });
  }
}

export const pomodoro = {
  getState: (): PomoState => state,
  subscribe(l: (s: PomoState) => void): () => void {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
  start() {
    if (state.running) return;
    set({ running: true });
    interval = window.setInterval(tick, 1000);
  },
  pause() {
    if (!state.running) return;
    window.clearInterval(interval);
    interval = undefined;
    set({ running: false });
  },
  reset() {
    window.clearInterval(interval);
    interval = undefined;
    set({ running: false, remain: duration });
  },
  setMinutes(m: number) {
    const mins = Math.max(1, Math.min(120, Math.round(m || 0)));
    duration = mins * 60;
    try {
      localStorage.setItem(KEY, String(mins));
    } catch {
      /* ignore */
    }
    // If not mid-session, reflect the new length immediately.
    set({ duration, remain: state.running ? state.remain : duration });
  }
};
