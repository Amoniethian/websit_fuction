import localforage from "localforage";

/**
 * Separate IndexedDB store for user-uploaded GLB models (fish / decor / tank).
 *
 * GLB files can be several MB; keeping them out of the synced zustand state
 * avoids re-serializing megabytes on every small state change. Values are
 * stored as base64 data URLs keyed by slot ("smallFish", "rock", "tank", …).
 */

const store = localforage.createInstance({ name: "cihai", storeName: "models" });

export type ModelSlot =
  | "smallFish" | "moonFish" | "clownfish" | "bigFish" | "turtle"
  | "rock" | "coral" | "anemone" | "seaweed" | "tank";

type Listener = (slot: ModelSlot) => void;
const listeners = new Set<Listener>();
const present = new Set<ModelSlot>();
let ready = false;

export async function initModels(): Promise<void> {
  const keys = await store.keys();
  for (const k of keys) present.add(k as ModelSlot);
  ready = true;
  listeners.forEach((l) => l("tank")); // nudge subscribers to re-read
}

export function modelsReady() {
  return ready;
}
export function hasModel(slot: ModelSlot): boolean {
  return present.has(slot);
}
export function getModel(slot: ModelSlot): Promise<string | null> {
  return store.getItem<string>(slot);
}
export async function setModel(slot: ModelSlot, dataUrl: string): Promise<void> {
  await store.setItem(slot, dataUrl);
  present.add(slot);
  listeners.forEach((l) => l(slot));
}
export async function clearModel(slot: ModelSlot): Promise<void> {
  await store.removeItem(slot);
  present.delete(slot);
  listeners.forEach((l) => l(slot));
}
export function subscribeModels(l: Listener): () => void {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

/** Read a File as a base64 data URL (for persisting GLB bytes). */
export function fileToDataUrl(f: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(f);
  });
}
