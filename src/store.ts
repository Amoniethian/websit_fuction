import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import localforage from "localforage";
import type { State, Vocab, CreatureType, Sentence, DecorType, DecorItem, SyncData } from "./types";
import {
  CONV,
  PENALTY,
  emptyInventory,
  emptyTodayStats,
  emptyCosmetics,
  defaultDecor,
  todayKey
} from "./types";
import { loadLlmConfig } from "./lib/llmConfig";
import type { EnrichedWord } from "./lib/llm-enrich";
import { toast } from "./ui/toast";
import { audio } from "./lib/audio";
import starterVocab from "./data/vocab-scholar-set1.json";

/**
 * Zustand store for 词海.
 * Persists to IndexedDB via localforage.
 *
 * All reward / penalty / mastery / learning-flow logic that the legacy
 * single-file build kept inline lives here as actions on the store.
 */

const SET_SIZE = 50;
const ICON_LABEL: Record<CreatureType, string> = {
  smallFish: "小鱼", moonFish: "月亮鱼", clownfish: "小丑鱼", bigFish: "大鱼",
  turtle: "水母", seaweed: "海草", anemone: "海葵", coral: "珊瑚"
};

function normalizeVocab(raw: any, id: number): Vocab {
  return {
    id,
    word: raw.word,
    phonetic: raw.phonetic || "",
    meaning: raw.meaning || "",
    forms: raw.forms || "",
    context: raw.context || "",
    note: raw.note || "",
    sentences: Array.isArray(raw.sentences) ? raw.sentences : [],
    learned: false,
    known: 0,
    miss: 0,
    mastered: false,
    enrichmentStatus: raw.enrichmentStatus
  };
}

type Actions = {
  // rewards
  grantWord: () => void;
  grantMinute: (m: number) => void;
  convertIfNeeded: () => void;
  // learning flow
  startLearnSession: () => void;
  learnAdvance: () => void;
  learnReview: () => void;
  learnSkipWord: () => void;
  learnExit: () => void;
  finishGroupTest: (right: number, total: number, checkPool: { wordId: number; sentence: Sentence }[]) => void;
  finishGroupCheckItem: (correct: boolean) => void;
  // quick capture
  addQuickWord: (word: string) => { id: number; duplicate: boolean };
  applyEnrichment: (id: number, e: EnrichedWord) => void;
  setEnrichmentStatus: (id: number, status: NonNullable<Vocab["enrichmentStatus"]>) => void;
  // review
  reviewFinish: (wordId: number, correct: boolean) => void;
  endReviewSession: () => void;
  checkMastery: () => void;
  // vocab management
  appendVocab: (list: any[]) => number;
  replaceVocab: (list: any[]) => void;
  resetLearned: () => void;
  // cosmetics
  setBackground: (url: string | null) => void;
  setCreatureImage: (type: CreatureType, url: string | null) => void;
  setPalette: (water: number, sand: number) => void;
  // 3D decor
  moveDecor: (id: string, x: number, z: number) => void;
  syncDecor: () => void;
  // cloud sync
  exportState: () => SyncData;
  importState: (d: SyncData) => void;
  markSynced: (iso: string) => void;
  resetAll: () => void;
};

export type Store = State & Actions;

function freshState(): State {
  return {
    vocab: (starterVocab as any[]).map((raw, i) => normalizeVocab(raw, i)),
    inv: emptyInventory(),
    today: emptyTodayStats(),
    rewardBuckets: { ten: 0, twentyFive: 0, fifty: 0, hundred: 0, twoHundred: 0 },
    timeBuckets: { twenty: 0, forty: 0, sixty: 0 },
    learnSession: null,
    reviewSession: { attempts: 0, correct: 0 },
    cosmetics: emptyCosmetics(),
    tankDecor: defaultDecor()
  };
}

const STRUCTURE_TYPES: DecorType[] = ["seaweed", "anemone", "coral"];

/** Random (x,z) on the sand floor, away from the very edges. */
function randomDecorPos(): { x: number; z: number; rot: number } {
  return {
    x: (Math.random() - 0.5) * 5.6,
    z: (Math.random() - 0.5) * 3.0,
    rot: Math.random() * Math.PI * 2
  };
}

let decorSeq = 0;
function newDecorId(type: string): string {
  decorSeq += 1;
  return `${type}-${Date.now().toString(36)}-${decorSeq}`;
}

/**
 * Reconcile the placeable decor list with earned structure counts:
 * non-default entries of each structure type should equal inventory.
 * Existing entries keep their (possibly user-arranged) positions.
 */
function reconcileDecor(decor: DecorItem[], inv: State["inv"]): DecorItem[] {
  const next = [...decor];
  for (const type of STRUCTURE_TYPES) {
    const owned = next.filter((d) => d.type === type && !d.def);
    const desired = (inv as any)[type] as number;
    if (owned.length < desired) {
      for (let i = owned.length; i < desired; i++) {
        const p = randomDecorPos();
        next.push({ id: newDecorId(type), type, x: p.x, z: p.z, rot: p.rot });
      }
    } else if (owned.length > desired) {
      let toRemove = owned.length - desired;
      // Remove most-recently-added non-default entries first.
      for (let i = next.length - 1; i >= 0 && toRemove > 0; i--) {
        if (next[i].type === type && !next[i].def) {
          next.splice(i, 1);
          toRemove--;
        }
      }
    }
  }
  return next;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      ...freshState(),

      /* ---------- Rewards ---------- */
      grantWord: () => {
        const s = get();
        const today = { ...s.today, learnedToday: s.today.learnedToday + 1 };
        const b = { ...s.rewardBuckets };
        const inv = { ...s.inv };
        b.ten++; b.twentyFive++; b.fifty++; b.hundred++; b.twoHundred++;
        if (b.ten >= 10)         { b.ten -= 10;         inv.smallFish++; toast("+ 一条小鱼"); audio.birth("smallFish"); }
        if (b.twentyFive >= 25)  { b.twentyFive -= 25;  inv.moonFish++;  toast("+ 一条月亮鱼"); audio.birth("moonFish"); }
        if (b.fifty >= 50)       { b.fifty -= 50;       inv.clownfish++; toast("+ 一条小丑鱼"); audio.birth("clownfish"); }
        if (b.hundred >= 100)    { b.hundred -= 100;    inv.bigFish++;   toast("+ 一条大鱼"); audio.birth("bigFish"); }
        if (b.twoHundred >= 200) { b.twoHundred -= 200; inv.turtle++;    toast("+ 一只水母"); audio.birth("turtle"); }
        set({ today, rewardBuckets: b, inv });
        get().convertIfNeeded();
      },

      grantMinute: (m) => {
        const s = get();
        const today = { ...s.today, minutes: s.today.minutes + m };
        const tb = { ...s.timeBuckets };
        const inv = { ...s.inv };
        tb.twenty += m; tb.forty += m; tb.sixty += m;
        while (tb.twenty >= 20) { tb.twenty -= 20; inv.seaweed++; toast("+ 海草"); audio.birth("seaweed"); }
        while (tb.forty  >= 40) { tb.forty  -= 40; inv.anemone++; toast("+ 海葵"); audio.birth("anemone"); }
        while (tb.sixty  >= 60) { tb.sixty  -= 60; inv.coral++;   toast("+ 珊瑚"); audio.birth("coral"); }
        set({ today, timeBuckets: tb, inv });
        get().convertIfNeeded();
        set({ tankDecor: reconcileDecor(get().tankDecor, get().inv) });
      },

      convertIfNeeded: () => {
        const s = get();
        const inv = { ...s.inv, medals: [...s.inv.medals] };
        for (const c of CONV) {
          while ((inv as any)[c.type] >= c.threshold) {
            const remove = c.threshold - c.keep;
            (inv as any)[c.type] -= remove;
            inv.medals.push({ type: c.type, label: c.label, n: remove });
            toast(c.label + " 凝成奖牌");
          }
        }
        set({ inv });
        set({ tankDecor: reconcileDecor(get().tankDecor, inv) });
      },

      /* ---------- Learning flow ---------- */
      startLearnSession: () => {
        const candidates = get().vocab.filter(
          (w) => !w.learned && w.enrichmentStatus !== "loading"
        );
        if (candidates.length === 0) return;
        const queue = candidates.slice(0, 10).map((w) => w.id);
        set({ learnSession: { queue, idx: 0, step: 0, mode: "word" } });
      },

      learnAdvance: () => {
        const s = get().learnSession;
        if (!s) return;
        const w = get().vocab.find((x) => x.id === s.queue[s.idx]);
        if (!w) return;
        let step = s.step;
        while (true) {
          step++;
          if (step >= 4) break;
          if (step === 1 && (!w.sentences || w.sentences.length < 2)) continue;
          if (step === 2 && (!w.sentences || w.sentences.length < 1)) continue;
          break;
        }
        if (step >= 4) {
          // Word complete.
          set({ vocab: get().vocab.map((x) => (x.id === w.id ? { ...x, learned: true } : x)) });
          get().grantWord();
          const cur = get().learnSession!;
          const idx = cur.idx + 1;
          if (idx >= cur.queue.length) {
            set({ learnSession: { ...cur, idx, step: 0, mode: "group" } });
          } else {
            set({ learnSession: { ...cur, idx, step: 0 } });
          }
        } else {
          set({ learnSession: { ...s, step } });
        }
      },

      // Go back to the word's familiarize card (re-read), keeping the queue.
      learnReview: () => {
        const s = get().learnSession;
        if (!s) return;
        set({ learnSession: { ...s, step: 0 } });
      },

      // "Can't recall": skip to the next word WITHOUT marking this one learned,
      // so it stays in the unlearned pool and comes back in a later group.
      learnSkipWord: () => {
        const s = get().learnSession;
        if (!s) return;
        const idx = s.idx + 1;
        if (idx >= s.queue.length) set({ learnSession: { ...s, idx, step: 0, mode: "group" } });
        else set({ learnSession: { ...s, idx, step: 0 } });
      },

      learnExit: () => set({ learnSession: null }),

      finishGroupTest: (right, total, checkPool) => {
        const s = get().learnSession;
        if (!s) return;
        const today = {
          ...get().today,
          attempts: get().today.attempts + total,
          correct: get().today.correct + right
        };
        if (checkPool.length === 0) {
          set({ today, learnSession: null });
          return;
        }
        set({
          today,
          learnSession: {
            ...s,
            mode: "groupCheck",
            checkPool,
            checkIdx: 0,
            checkResults: { right: 0, wrong: 0 }
          }
        });
      },

      finishGroupCheckItem: (correct) => {
        const s = get().learnSession;
        if (!s || !s.checkPool || s.checkResults === undefined || s.checkIdx === undefined) return;
        const cr = {
          right: s.checkResults.right + (correct ? 1 : 0),
          wrong: s.checkResults.wrong + (correct ? 0 : 1)
        };
        const checkIdx = s.checkIdx + 1;
        if (checkIdx >= s.checkPool.length) {
          set({
            today: {
              ...get().today,
              attempts: get().today.attempts + s.checkPool.length,
              correct: get().today.correct + cr.right
            },
            learnSession: null
          });
          toast(`整组默写：${cr.right}/${s.checkPool.length} 通过`);
        } else {
          set({ learnSession: { ...s, checkIdx, checkResults: cr } });
        }
      },

      /* ---------- Quick capture ---------- */
      addQuickWord: (rawWord) => {
        const word = rawWord.replace(/\s+/g, " ").trim();
        const s = get();
        if (!word) return { id: -1, duplicate: false };
        if (s.vocab.find((w) => w.word.toLowerCase() === word.toLowerCase())) {
          return { id: -1, duplicate: true };
        }
        const id = s.vocab.length === 0 ? 0 : Math.max(...s.vocab.map((v) => v.id)) + 1;
        const entry = normalizeVocab({ word }, id);
        entry.enrichmentStatus = loadLlmConfig() ? "loading" : "minimal";
        set({ vocab: [...s.vocab, entry] });
        return { id, duplicate: false };
      },

      applyEnrichment: (id, e) =>
        set({
          vocab: get().vocab.map((w) =>
            w.id === id
              ? {
                  ...w,
                  phonetic: e.phonetic,
                  meaning: e.meaning,
                  forms: e.forms,
                  context: e.context,
                  sentences: Array.isArray(e.sentences) ? e.sentences : [],
                  enrichmentStatus: "done"
                }
              : w
          )
        }),

      setEnrichmentStatus: (id, status) =>
        set({
          vocab: get().vocab.map((w) => (w.id === id ? { ...w, enrichmentStatus: status } : w))
        }),

      /* ---------- Review ---------- */
      reviewFinish: (wordId, correct) => {
        const s = get();
        set({
          vocab: s.vocab.map((w) =>
            w.id === wordId
              ? { ...w, known: w.known + (correct ? 1 : 0), miss: w.miss + (correct ? 0 : 1) }
              : w
          ),
          today: {
            ...s.today,
            attempts: s.today.attempts + 1,
            correct: s.today.correct + (correct ? 1 : 0)
          },
          reviewSession: {
            attempts: s.reviewSession.attempts + 1,
            correct: s.reviewSession.correct + (correct ? 1 : 0)
          }
        });
      },

      endReviewSession: () => {
        const s = get();
        const att = s.reviewSession.attempts;
        if (att === 0) {
          toast("本次还未开始");
          return;
        }
        const rate = (att - s.reviewSession.correct) / att;
        const inv = { ...s.inv };
        const losses: string[] = [];
        const take = (type: CreatureType) => {
          if ((inv as any)[type] > 0) {
            (inv as any)[type]--;
            losses.push("- 1 " + ICON_LABEL[type]);
          }
        };
        for (const p of PENALTY) if (rate > p.errorRate) take(p.type);
        set({ inv, reviewSession: { attempts: 0, correct: 0 } });
        get().checkMastery();
        toast(
          `本次 ${att} 题，错误率 ${(rate * 100).toFixed(0)}%。` +
            (losses.length ? " " + losses.join("，") : " 全部留缸")
        );
      },

      checkMastery: () => {
        const vocab = get().vocab.map((w) => ({ ...w }));
        let changed = false;
        for (let si = 0; si * SET_SIZE < vocab.length; si++) {
          const slice = vocab.slice(si * SET_SIZE, (si + 1) * SET_SIZE);
          if (slice.length < SET_SIZE) continue;
          if (!slice.every((w) => w.learned)) continue;
          const known = slice.reduce((a, w) => a + w.known, 0);
          const miss = slice.reduce((a, w) => a + w.miss, 0);
          const total = known + miss;
          if (total < SET_SIZE) continue;
          if (known / total >= 0.9 && !slice.every((w) => w.mastered)) {
            for (const w of slice) w.mastered = true;
            changed = true;
            toast(`第 ${si + 1} 套词已掌握，复习升级为整句默写`);
            audio.mastered();
          }
        }
        if (changed) set({ vocab });
      },

      /* ---------- Vocab management ---------- */
      appendVocab: (list) => {
        const s = get();
        let nextId = s.vocab.length === 0 ? 0 : Math.max(...s.vocab.map((v) => v.id)) + 1;
        const entries = list.filter((x) => x && x.word).map((raw) => normalizeVocab(raw, nextId++));
        set({ vocab: [...s.vocab, ...entries] });
        return entries.length;
      },

      replaceVocab: (list) => {
        let id = 0;
        const entries = list.filter((x) => x && x.word).map((raw) => normalizeVocab(raw, id++));
        set({ vocab: entries, learnSession: null });
      },

      resetLearned: () =>
        set({ vocab: get().vocab.map((w) => ({ ...w, learned: false })) }),

      /* ---------- Cosmetics ---------- */
      setBackground: (url) => set({ cosmetics: { ...get().cosmetics, background: url } }),

      setCreatureImage: (type, url) =>
        set({
          cosmetics: {
            ...get().cosmetics,
            creatures: { ...get().cosmetics.creatures, [type]: url }
          }
        }),

      setPalette: (water, sand) =>
        set({ cosmetics: { ...get().cosmetics, palette: { water, sand } } }),

      moveDecor: (id, x, z) =>
        set({ tankDecor: get().tankDecor.map((d) => (d.id === id ? { ...d, x, z } : d)) }),

      syncDecor: () => set({ tankDecor: reconcileDecor(get().tankDecor, get().inv) }),

      exportState: () => {
        const s = get();
        return {
          vocab: s.vocab, inv: s.inv, today: s.today,
          rewardBuckets: s.rewardBuckets, timeBuckets: s.timeBuckets,
          cosmetics: s.cosmetics, tankDecor: s.tankDecor,
          _syncedAt: s._syncedAt, _device: s._device
        };
      },

      importState: (d) =>
        set({
          vocab: d.vocab ?? get().vocab,
          inv: d.inv ?? get().inv,
          today: d.today ?? get().today,
          rewardBuckets: d.rewardBuckets ?? get().rewardBuckets,
          timeBuckets: d.timeBuckets ?? get().timeBuckets,
          cosmetics: d.cosmetics ?? get().cosmetics,
          tankDecor: reconcileDecor(d.tankDecor ?? get().tankDecor, d.inv ?? get().inv),
          _syncedAt: d._syncedAt,
          _device: d._device
        }),

      markSynced: (iso) => set({ _syncedAt: iso }),

      resetAll: () => set(freshState())
    }),
    {
      name: "cihai-state",
      storage: createJSONStorage(() => ({
        getItem: async (k) => (await localforage.getItem<string>(k)) ?? null,
        setItem: async (k, v) => {
          await localforage.setItem(k, v);
        },
        removeItem: async (k) => {
          await localforage.removeItem(k);
        }
      })),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        // Reset the day on rehydrate.
        if (state.today.date !== todayKey()) state.today = emptyTodayStats();
        // Recover entries stuck mid-enrichment from a previous session.
        for (const w of state.vocab) {
          if (w.enrichmentStatus === "loading") w.enrichmentStatus = "failed";
        }
        // Migrate older saves that predate the 3D tank.
        if (!state.tankDecor || state.tankDecor.length === 0) state.tankDecor = defaultDecor();
        state.tankDecor = reconcileDecor(state.tankDecor, state.inv);
      },
      // Persist learnSession (resume mid-group); never persist the live review tally.
      partialize: (s) => ({ ...s, reviewSession: { attempts: 0, correct: 0 } })
    }
  )
);
