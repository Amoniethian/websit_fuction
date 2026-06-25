/**
 * Data model for 词海 / Cihai.
 * Single source of truth — both UI and storage layers import from here.
 *
 * The full design rationale for each field lives in legacy/cihai-design-spec.md.
 */

export type Sentence = { en: string; zh: string };

export type Vocab = {
  id: number;
  word: string;
  phonetic: string;
  meaning: string;
  forms: string;
  context: string;
  note: string;
  sentences: Sentence[];

  // Learning state
  learned: boolean;
  known: number;
  miss: number;
  mastered: boolean;

  // Optional: quick-capture lifecycle
  enrichmentStatus?: "loading" | "done" | "failed" | "minimal";
};

export type Medal = { type: CreatureType; label: string; n: number };

export type CreatureType =
  | "smallFish" | "moonFish" | "clownfish" | "bigFish" | "turtle"
  | "seaweed" | "anemone" | "coral";

export type Inventory = {
  smallFish: number; moonFish: number; clownfish: number; bigFish: number; turtle: number;
  seaweed: number; anemone: number; coral: number;
  medals: Medal[];
};

export type TodayStats = {
  date: string;             // YYYY-M-D
  learnedToday: number;     // new words learned today (for daily display)
  attempts: number;
  correct: number;
  minutes: number;          // focus minutes today
};

export type RewardBuckets = {
  ten: number; twentyFive: number; fifty: number; hundred: number; twoHundred: number;
};
export type TimeBuckets = {
  twenty: number; forty: number; sixty: number;
};

export type LearnSession = {
  queue: number[];          // vocab ids
  idx: number;              // current word index
  step: number;             // 0..3
  mode: "word" | "group" | "groupCheck";
  checkPool?: { wordId: number; sentence: Sentence }[];
  checkIdx?: number;
  checkResults?: { right: number; wrong: number };
} | null;

export type Cosmetics = {
  background: string | null;     // data URL or model reference
  creatures: Record<CreatureType, string | null>;
  palette: { water: number; sand: number };
};

/** A placed decoration in the 3D tank (rocks + earned structures). */
export type DecorType = "rock" | "coral" | "anemone" | "seaweed";
export type DecorItem = {
  id: string;
  type: DecorType;
  x: number;   // sand-plane position
  z: number;
  rot: number; // y-rotation (radians)
  def?: boolean; // part of the default scenery (never auto-removed)
};

export type State = {
  vocab: Vocab[];
  inv: Inventory;
  today: TodayStats;
  rewardBuckets: RewardBuckets;
  timeBuckets: TimeBuckets;
  learnSession: LearnSession;
  reviewSession: { attempts: number; correct: number };
  cosmetics: Cosmetics;
  tankDecor: DecorItem[];

  // Sync metadata (set on each successful cloud push)
  _syncedAt?: string;
  _device?: string;
};

/** The subset of state that syncs to the cloud (excludes transient sessions + local-only blobs). */
export type SyncData = {
  vocab: Vocab[];
  inv: Inventory;
  today: TodayStats;
  rewardBuckets: RewardBuckets;
  timeBuckets: TimeBuckets;
  cosmetics: Cosmetics;
  tankDecor: DecorItem[];
  _syncedAt?: string;
  _device?: string;
};

/** Conversion thresholds (50 small fish → keep 25 + medal, etc.) */
export const CONV: { type: CreatureType; threshold: number; keep: number; label: string }[] = [
  { type: "smallFish", threshold: 50, keep: 25, label: "小鱼" },
  { type: "moonFish",  threshold: 15, keep: 5,  label: "月亮鱼" },
  { type: "clownfish", threshold: 10, keep: 5,  label: "小丑鱼" },
  { type: "bigFish",   threshold: 4,  keep: 1,  label: "大鱼" },
  { type: "seaweed",   threshold: 20, keep: 5,  label: "海草" },
  { type: "anemone",   threshold: 10, keep: 5,  label: "海葵" },
  { type: "coral",     threshold: 8,  keep: 2,  label: "珊瑚" }
];

/** Review penalty thresholds — errorRate > X loses one of Y */
export const PENALTY: { errorRate: number; type: CreatureType; label: string }[] = [
  { errorRate: 0.20, type: "smallFish", label: "小鱼" },
  { errorRate: 0.35, type: "moonFish",  label: "月亮鱼" },
  { errorRate: 0.40, type: "clownfish", label: "小丑鱼" },
  { errorRate: 0.60, type: "bigFish",   label: "大鱼" }
];

export function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function emptyInventory(): Inventory {
  return {
    smallFish: 0, moonFish: 0, clownfish: 0, bigFish: 0, turtle: 0,
    seaweed: 0, anemone: 0, coral: 0, medals: []
  };
}

export function emptyTodayStats(): TodayStats {
  return { date: todayKey(), learnedToday: 0, attempts: 0, correct: 0, minutes: 0 };
}

/** A small built-in scene so a fresh tank already looks alive (matches the sketch). */
export function defaultDecor(): DecorItem[] {
  return [
    { id: "d-rock-1", type: "rock", x: -0.4, z: 0.1, rot: 0.6, def: true },
    { id: "d-rock-2", type: "rock", x: 0.5, z: -0.5, rot: 2.1, def: true },
    { id: "d-rock-3", type: "rock", x: -1.7, z: 0.7, rot: 1.2, def: true },
    { id: "d-anem-1", type: "anemone", x: 0.0, z: 0.5, rot: 0, def: true },
    { id: "d-weed-1", type: "seaweed", x: -1.9, z: -0.7, rot: 0, def: true },
    { id: "d-weed-2", type: "seaweed", x: 1.7, z: 0.6, rot: 0, def: true },
    { id: "d-coral-1", type: "coral", x: 1.5, z: -0.7, rot: 0.4, def: true }
  ];
}

export function emptyCosmetics(): Cosmetics {
  return {
    background: null,
    creatures: {
      smallFish: null, moonFish: null, clownfish: null, bigFish: null, turtle: null,
      seaweed: null, anemone: null, coral: null
    },
    palette: { water: 0xb8dcd8, sand: 0xc8a874 }
  };
}
