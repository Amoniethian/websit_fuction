/**
 * 词海 audio engine — two independent systems on the Web Audio API:
 *
 *   1. Ambient (the "BGM"): a calm underwater bed — low brown-noise wash,
 *      a slow detuned sine pad, occasional bubbles and water-flow swells.
 *   2. Feedback: short one-shot cues for correct / wrong / new creature /
 *      pomodoro end / set mastered.
 *
 * No audio files are bundled — everything is synthesized (OscillatorNode +
 * GainNode envelopes + a generated noise buffer), per design spec §7.
 *
 * Browsers block audio until a user gesture, so nothing starts until
 * `ensure()` is called from within a real interaction.
 */

export type AudioSettings = {
  ambientOn: boolean;
  ambientVol: number; // 0..1
  fxOn: boolean;
  fxVol: number; // 0..1
};

const STORAGE_KEY = "cihai-audio";
const DEFAULTS: AudioSettings = { ambientOn: true, ambientVol: 0.3, fxOn: true, fxVol: 0.6 };

function loadSettings(): AudioSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : { ...DEFAULTS };
  } catch {
    return { ...DEFAULTS };
  }
}

type Listener = (s: AudioSettings) => void;

class AudioEngine {
  private ctx: AudioContext | null = null;
  private ambientBus: GainNode | null = null;
  private fxBus: GainNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;
  private ambientNodes: AudioNode[] = [];
  private ambientRunning = false;
  private bubbleTimer = 0;
  private flowTimer = 0;
  private settings: AudioSettings = loadSettings();
  private listeners = new Set<Listener>();

  getSettings() {
    return this.settings;
  }
  subscribe(l: Listener) {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  }
  private emit() {
    this.listeners.forEach((l) => l(this.settings));
  }

  setSettings(patch: Partial<AudioSettings>) {
    this.settings = { ...this.settings, ...patch };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
    } catch {
      /* ignore */
    }
    if (this.ambientBus && this.ctx) {
      this.ambientBus.gain.setTargetAtTime(this.settings.ambientVol, this.ctx.currentTime, 0.2);
    }
    if (this.fxBus && this.ctx) {
      this.fxBus.gain.value = this.settings.fxVol;
    }
    if (this.settings.ambientOn) this.startAmbient();
    else this.stopAmbient();
    this.emit();
  }

  /** Call from a user gesture: creates/resumes the context and starts ambient if enabled. */
  ensure() {
    if (!this.ctx) {
      const Ctor = window.AudioContext || (window as any).webkitAudioContext;
      if (!Ctor) return;
      this.ctx = new Ctor();
      this.ambientBus = this.ctx.createGain();
      this.ambientBus.gain.value = this.settings.ambientVol;
      this.ambientBus.connect(this.ctx.destination);
      this.fxBus = this.ctx.createGain();
      this.fxBus.gain.value = this.settings.fxVol;
      this.fxBus.connect(this.ctx.destination);
      this.noiseBuffer = this.makeNoiseBuffer();
    }
    if (this.ctx.state === "suspended") this.ctx.resume();
    if (this.settings.ambientOn) this.startAmbient();
  }

  private makeNoiseBuffer(): AudioBuffer {
    const ctx = this.ctx!;
    const len = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    // Brown noise: integrate white noise for a soft, deep wash.
    let last = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      d[i] = last * 3.5;
    }
    return buf;
  }

  /* ---------- Ambient ---------- */
  private startAmbient() {
    if (!this.ctx || this.ambientRunning) return;
    const ctx = this.ctx;
    this.ambientRunning = true;

    // Deep noise wash through a low-pass filter.
    const noise = ctx.createBufferSource();
    noise.buffer = this.noiseBuffer;
    noise.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 420;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.5;
    noise.connect(lp).connect(noiseGain).connect(this.ambientBus!);
    noise.start();

    // Slow detuned sine pad — a calm minor-ish chord (A2, E3, A3).
    const padGain = ctx.createGain();
    padGain.gain.value = 0.06;
    padGain.connect(this.ambientBus!);
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = "lowpass";
    padFilter.frequency.value = 700;
    padFilter.connect(padGain);
    const freqs = [110, 164.81, 220];
    const oscs: OscillatorNode[] = [];
    for (const f of freqs) {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = f;
      o.detune.value = (Math.random() - 0.5) * 8;
      o.connect(padFilter);
      o.start();
      oscs.push(o);
    }
    // Gentle LFO opening/closing the pad filter for a breathing feel.
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 250;
    lfo.connect(lfoGain).connect(padFilter.frequency);
    lfo.start();

    this.ambientNodes = [noise, lp, noiseGain, padGain, padFilter, lfo, lfoGain, ...oscs];
    this.scheduleBubble();
    this.scheduleFlow();
  }

  private stopAmbient() {
    if (!this.ambientRunning) return;
    this.ambientRunning = false;
    window.clearTimeout(this.bubbleTimer);
    window.clearTimeout(this.flowTimer);
    for (const n of this.ambientNodes) {
      try {
        (n as OscillatorNode).stop?.();
      } catch {
        /* not a source */
      }
      try {
        n.disconnect();
      } catch {
        /* ignore */
      }
    }
    this.ambientNodes = [];
  }

  private scheduleBubble() {
    if (!this.ambientRunning) return;
    this.bubbleTimer = window.setTimeout(() => {
      this.bubble();
      this.scheduleBubble();
    }, 8000 + Math.random() * 12000);
  }
  private scheduleFlow() {
    if (!this.ambientRunning) return;
    this.flowTimer = window.setTimeout(() => {
      this.waterFlow();
      this.scheduleFlow();
    }, 30000 + Math.random() * 30000);
  }

  private bubble() {
    const ctx = this.ctx!;
    const n = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) {
      const t = ctx.currentTime + i * 0.07;
      const o = ctx.createOscillator();
      o.type = "sine";
      const base = 500 + Math.random() * 500;
      o.frequency.setValueAtTime(base, t);
      o.frequency.exponentialRampToValueAtTime(base * 2.2, t + 0.08);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.05, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      o.connect(g).connect(this.ambientBus!);
      o.start(t);
      o.stop(t + 0.14);
    }
  }

  private waterFlow() {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 600;
    bp.Q.value = 0.7;
    const g = ctx.createGain();
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.12, t + 1.2);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);
    src.connect(bp).connect(g).connect(this.ambientBus!);
    src.start(t);
    src.stop(t + 3.4);
  }

  /* ---------- Feedback one-shots ---------- */
  private bell(freq: number, dur: number, when = 0, type: OscillatorType = "sine", peak = 0.5) {
    if (!this.ctx || !this.settings.fxOn) return;
    const ctx = this.ctx;
    const t = ctx.currentTime + when;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.fxBus!);
    o.start(t);
    o.stop(t + dur + 0.05);
    // soft overtone
    const o2 = ctx.createOscillator();
    o2.type = "sine";
    o2.frequency.value = freq * 2;
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.0001, t);
    g2.gain.exponentialRampToValueAtTime(peak * 0.25, t + 0.012);
    g2.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.7);
    o2.connect(g2).connect(this.fxBus!);
    o2.start(t);
    o2.stop(t + dur);
  }

  correct() {
    this.ensure();
    this.bell(880, 0.6, 0, "sine", 0.45);
    this.bell(1318.5, 0.5, 0.04, "sine", 0.18);
  }

  wrong() {
    if (!this.ctx || !this.settings.fxOn) {
      this.ensure();
      if (!this.ctx || !this.settings.fxOn) return;
    }
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(200, t);
    o.frequency.exponentialRampToValueAtTime(120, t + 0.25);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 500;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.35, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
    o.connect(lp).connect(g).connect(this.fxBus!);
    o.start(t);
    o.stop(t + 0.34);
  }

  /** Different base frequency per species — bigger creature, lower note. */
  birth(type: string) {
    this.ensure();
    const base: Record<string, number> = {
      smallFish: 784, moonFish: 659.25, clownfish: 698.46, bigFish: 392, turtle: 261.63,
      seaweed: 523.25, anemone: 587.33, coral: 440
    };
    this.bell(base[type] ?? 523.25, 0.8, 0, "triangle", 0.4);
    this.bell((base[type] ?? 523.25) * 1.5, 0.6, 0.06, "sine", 0.15);
  }

  pomodoroEnd() {
    this.ensure();
    this.bell(659.25, 1.0, 0, "sine", 0.45);
    this.bell(659.25, 0.9, 0.5, "sine", 0.3);
    this.bell(659.25, 0.8, 1.0, "sine", 0.2);
  }

  mastered() {
    this.ensure();
    // A bright major chord swelling over ~2s.
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) => this.bell(f, 1.8, i * 0.12, "sine", 0.3));
  }
}

export const audio = new AudioEngine();
