/**
 * Quick-capture word enrichment via LLM.
 *
 * Given a bare English word/phrase, returns phonetic, Chinese meaning,
 * tense/derivation variants, register tag, and two example sentences
 * with Chinese translations.
 *
 * Works with any OpenAI-compatible chat completion endpoint
 * (OpenAI, Anthropic via proxy, Deepseek, Moonshot, OpenRouter…).
 *
 * For production: do NOT bundle the API key in the client. Run the
 * call through a thin server function (Cloudflare Worker / Vercel
 * Edge / Supabase Edge Function) that proxies the request and keeps
 * the key server-side. The function below is suitable for local dev
 * only — see "deploying with key safety" below.
 */

import type { Sentence } from "../types";

export type EnrichedWord = {
  phonetic: string;
  meaning: string;
  forms: string;
  context: string;
  sentences: Sentence[];
};

export type EnrichConfig = {
  endpoint: string;     // e.g. "https://api.openai.com/v1/chat/completions"
  apiKey: string;       // dev only; in prod call your proxy instead
  model: string;        // e.g. "gpt-4o-mini" or "claude-haiku-4-5"
  /**
   * Optional contextual hint (e.g. "phenomenology", "casual English").
   * Steers the LLM toward usage examples in that domain.
   */
  domainHint?: string;
};

const SYSTEM = `You are a vocabulary explainer for a Chinese-speaking learner.
You return ONLY a valid JSON object — no prose, no markdown fences.`;

function buildUserPrompt(word: string, domainHint?: string): string {
  const hint = domainHint ? `\n\nUsage context: ${domainHint}` : "";
  return `Given the English word or phrase: "${word}"${hint}

Return ONLY a valid JSON object with this exact schema:
{
  "phonetic": "IPA in slashes, e.g. /ɪˈfemərəl/",
  "meaning": "Chinese meaning with part of speech, e.g. adj. 短暂的",
  "forms": "common variations (tense, comparative, derivatives) separated by '; ' — or '—' if none",
  "context": "short usage register tag in English (e.g. literary / academic / casual)",
  "sentences": [
    { "en": "A natural English sentence using the word.", "zh": "对应的自然中文翻译。" },
    { "en": "Another contextually different sentence.", "zh": "另一句自然中文翻译。" }
  ]
}

Rules:
- Sentences must be authentic and varied (not template-like).
- Chinese translations should be natural, not literal word-for-word.
- "forms" should be empty string or "—" if the word has no useful inflections.`;
}

/**
 * Read enrichment config from Vite env. Returns null when no key/endpoint is
 * configured — in that case quick-captured words are stored as "minimal" and
 * the user fills in the meaning by hand.
 */
export function enrichConfigFromEnv(): EnrichConfig | null {
  const endpoint = import.meta.env.VITE_LLM_ENDPOINT;
  const apiKey = import.meta.env.VITE_LLM_API_KEY;
  const model = import.meta.env.VITE_LLM_MODEL || "gpt-4o-mini";
  if (!endpoint || !apiKey) return null;
  return { endpoint, apiKey, model };
}

export async function enrichWord(word: string, config: EnrichConfig): Promise<EnrichedWord> {
  const body = {
    model: config.model,
    temperature: 0.4,
    response_format: { type: "json_object" as const },
    messages: [
      { role: "system", content: SYSTEM },
      { role: "user", content: buildUserPrompt(word, config.domainHint) }
    ]
  };
  const r = await fetch(config.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`
    },
    body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error(`LLM HTTP ${r.status}`);
  const j = await r.json();
  const text: string = j.choices?.[0]?.message?.content ?? "";
  return parseEnriched(text);
}

function parseEnriched(text: string): EnrichedWord {
  let cleaned = text.trim();
  // Strip code fences if present
  cleaned = cleaned.replace(/^```(?:json)?/, "").replace(/```$/, "").trim();
  const i = cleaned.indexOf("{");
  const j = cleaned.lastIndexOf("}");
  if (i < 0 || j < 0) throw new Error("LLM response did not contain JSON");
  const obj = JSON.parse(cleaned.slice(i, j + 1));
  return {
    phonetic: obj.phonetic ?? "",
    meaning: obj.meaning ?? "",
    forms: obj.forms ?? "",
    context: obj.context ?? "",
    sentences: Array.isArray(obj.sentences) ? obj.sentences : []
  };
}

/* ─── Deploying with key safety ────────────────────────────────────────
   For production, replace `enrichWord` with a call to your proxy:

     export async function enrichWord(word: string): Promise<EnrichedWord> {
       const r = await fetch("/api/enrich", { method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify({ word }) });
       return await r.json();
     }

   And on the proxy side (Cloudflare Worker example):

     export default {
       async fetch(req: Request, env: Env) {
         const { word } = await req.json();
         const r = await fetch("https://api.openai.com/v1/chat/completions", {
           method: "POST",
           headers: { Authorization: `Bearer ${env.OPENAI_KEY}`,
                      "Content-Type": "application/json" },
           body: JSON.stringify({ ... })
         });
         return new Response(await r.text(), {
           headers: { "Content-Type": "application/json" }
         });
       }
     };
─────────────────────────────────────────────────────────────────────── */
