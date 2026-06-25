import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import localforage from "localforage";
import type { State, Vocab, CreatureType, Sentence } from "./types";
import {
  CONV,
  PENALTY,
  emptyInventory,
  emptyTodayStats,
  emptyCosmetics,
  todayKey
} from "./types";
import { enrichConfigFromEnv } from "./lib/llm-enrich";
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
  turtle: "海龟", seaweed: "海草", anemone: "海葵", coral: "珊瑚"
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
    cosmetics: emptyCosmetics()
  };
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
        if (b.twoHundred >= 200) { b.twoHundred -= 200; inv.turtle++;    toast("+ 一只海龟"); audio.birth("turtle"); }
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
        entry.enrichmentStatus = enrichConfigFromEnv() ? "loading" : "minimal";
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
      },
      // Persist learnSession (resume mid-group); never persist the live review tally.
      partialize: (s) => ({ ...s, reviewSession: { attempts: 0, correct: 0 } })
    }
  )
);
