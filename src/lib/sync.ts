import type { SupabaseClient } from "@supabase/supabase-js";
import { loadSupabaseConfig } from "./supabaseConfig";
import { useStore } from "../store";
import { toast } from "../ui/toast";
import { setModel as setLocalModel, type ModelSlot } from "../features/aquarium-3d/modelStore";

const BUCKET = "cihai-models";

/**
 * Cross-device sync via Supabase.
 *
 * Table (run once in the Supabase SQL editor):
 *
 *   create table if not exists cihai_state (
 *     user_id uuid primary key references auth.users on delete cascade,
 *     data jsonb not null,
 *     updated_at timestamptz not null default now()
 *   );
 *   alter table cihai_state enable row level security;
 *   create policy "own row" on cihai_state
 *     for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
 *
 * Strategy: pull on login, last-write-wins by timestamp, debounced push on change.
 */

const TABLE = "cihai_state";

export type SyncStatus = {
  state: "off" | "signedOut" | "idle" | "syncing" | "error";
  email?: string;
  message?: string;
};

let status: SyncStatus = { state: "off" };
const listeners = new Set<(s: SyncStatus) => void>();
function setStatus(s: SyncStatus) {
  status = s;
  listeners.forEach((l) => l(s));
}
export function getSyncStatus() {
  return status;
}
export function subscribeSync(l: (s: SyncStatus) => void): () => void {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

let client: SupabaseClient | null = null;
let clientUrl = "";

/**
 * Lazily create the Supabase client — and only dynamically import the
 * (~55KB gz) library when sync is actually configured, so users who never
 * set up sync don't pay for it on first load.
 */
async function ensureClient(): Promise<SupabaseClient | null> {
  const cfg = loadSupabaseConfig();
  if (!cfg) return null;
  if (!client || clientUrl !== cfg.url) {
    const { createClient } = await import("@supabase/supabase-js");
    client = createClient(cfg.url, cfg.anonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
    });
    clientUrl = cfg.url;
  }
  return client;
}

async function getUser() {
  const c = await ensureClient();
  if (!c) return null;
  const { data } = await c.auth.getUser();
  return data.user ?? null;
}

/* ---------- content fingerprint (avoid push loops) ---------- */
let lastContent = "";
function contentKey(): string {
  const s = useStore.getState().exportState();
  const { _syncedAt, _device, ...rest } = s;
  return JSON.stringify(rest);
}

/* ---------- auth ---------- */
export async function signUp(email: string, password: string) {
  const c = await ensureClient();
  if (!c) return toast("请先填 Supabase 配置");
  const { error } = await c.auth.signUp({ email, password });
  if (error) {
    setStatus({ state: "error", message: error.message });
    toast("注册失败：" + error.message);
  } else {
    toast("注册成功，请登录（若开了邮箱验证，先去邮箱确认）");
  }
}

export async function signIn(email: string, password: string) {
  const c = await ensureClient();
  if (!c) return toast("请先填 Supabase 配置");
  setStatus({ state: "syncing", message: "登录中…" });
  const { data, error } = await c.auth.signInWithPassword({ email, password });
  if (error) {
    setStatus({ state: "error", message: error.message });
    toast("登录失败：" + error.message);
    return;
  }
  setStatus({ state: "idle", email: data.user?.email });
  await afterLogin();
}

export async function signOut() {
  const c = await ensureClient();
  if (c) await c.auth.signOut();
  setStatus({ state: "signedOut" });
  toast("已退出登录");
}

/* ---------- pull / push ---------- */
async function pull(): Promise<{ data: any; updated_at: string } | null> {
  const c = await ensureClient();
  const u = await getUser();
  if (!c || !u) return null;
  const { data, error } = await c.from(TABLE).select("data, updated_at").eq("user_id", u.id).maybeSingle();
  if (error) {
    setStatus({ state: "error", email: u.email, message: error.message });
    return null;
  }
  return data as any;
}

export async function pushNow(): Promise<void> {
  const c = await ensureClient();
  const u = await getUser();
  if (!c || !u) return;
  setStatus({ state: "syncing", email: u.email, message: "上传中…" });
  const snap = useStore.getState().exportState();
  const now = new Date().toISOString();
  snap._syncedAt = now;
  snap._device = navigator.userAgent.slice(0, 48);
  const { error } = await c.from(TABLE).upsert({ user_id: u.id, data: snap, updated_at: now });
  if (error) {
    setStatus({ state: "error", email: u.email, message: error.message });
    toast("同步失败：" + error.message);
    return;
  }
  useStore.getState().markSynced(now);
  lastContent = contentKey();
  setStatus({ state: "idle", email: u.email, message: "已同步" });
}

export async function pullNow(): Promise<void> {
  const remote = await pull();
  const u = await getUser();
  if (remote?.data) {
    useStore.getState().importState(remote.data);
    lastContent = contentKey();
    setStatus({ state: "idle", email: u?.email, message: "已载入云端" });
    toast("已从云端载入进度");
  } else {
    toast("云端暂无存档");
  }
}

async function afterLogin() {
  const remote = await pull();
  const u = await getUser();
  const localSyncedAt = useStore.getState()._syncedAt;
  if (remote?.data) {
    const remoteNewer = !localSyncedAt || new Date(remote.updated_at) > new Date(localSyncedAt);
    if (remoteNewer) {
      useStore.getState().importState(remote.data);
      lastContent = contentKey();
      toast("已从云端载入进度");
      setStatus({ state: "idle", email: u?.email, message: "已载入云端" });
    } else {
      await pushNow();
      toast("已把本地进度推送到云端");
    }
  } else {
    await pushNow();
    toast("已创建云端存档");
  }
  await pullModels();
}

/* ---------- model files (Supabase Storage) ---------- */
function blobToDataUrl(b: Blob): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(b);
  });
}

/** Upload a just-picked GLB to the user's folder (no-op when signed out). */
export async function uploadModelFile(slot: ModelSlot, file: File) {
  const c = await ensureClient();
  const u = await getUser();
  if (!c || !u) return;
  const { error } = await c.storage.from(BUCKET).upload(`${u.id}/${slot}.glb`, file, {
    upsert: true,
    contentType: "model/gltf-binary"
  });
  if (error) toast("模型上传云端失败：" + error.message);
}

export async function deleteModelFromCloud(slot: ModelSlot) {
  const c = await ensureClient();
  const u = await getUser();
  if (!c || !u) return;
  await c.storage.from(BUCKET).remove([`${u.id}/${slot}.glb`]);
}

/** Download all of the user's model files into the local model store. */
async function pullModels() {
  const c = await ensureClient();
  const u = await getUser();
  if (!c || !u) return;
  const { data: files, error } = await c.storage.from(BUCKET).list(u.id);
  if (error || !files) return;
  for (const f of files) {
    if (!f.name.endsWith(".glb")) continue;
    const slot = f.name.replace(/\.glb$/, "") as ModelSlot;
    const { data: blob } = await c.storage.from(BUCKET).download(`${u.id}/${f.name}`);
    if (blob) await setLocalModel(slot, await blobToDataUrl(blob));
  }
}

/* ---------- auto-push on change ---------- */
let timer: number | undefined;
function scheduleAutoPush() {
  // Cheap synchronous guard (no Supabase import) when sync isn't configured.
  if (!loadSupabaseConfig()) return;
  window.clearTimeout(timer);
  timer = window.setTimeout(async () => {
    const u = await getUser();
    if (!u) return;
    if (contentKey() === lastContent) return;
    await pushNow();
  }, 8000);
}

let started = false;
export function initSync() {
  if (started) return;
  started = true;
  useStore.subscribe(scheduleAutoPush);
  if (!loadSupabaseConfig()) {
    setStatus({ state: "off" });
    return;
  }
  ensureClient().then((c) => {
    if (!c) {
      setStatus({ state: "off" });
      return;
    }
    c.auth.getSession().then(({ data }) => {
      if (data.session) {
        setStatus({ state: "idle", email: data.session.user.email });
        lastContent = contentKey();
        afterLogin();
      } else {
        setStatus({ state: "signedOut" });
      }
    });
  });
}

/** Re-evaluate after the user edits the Supabase config. */
export function reinitSync() {
  client = null;
  clientUrl = "";
  started = false;
  initSync();
}
