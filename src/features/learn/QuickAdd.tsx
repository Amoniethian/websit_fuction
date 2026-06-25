import { useState } from "react";
import { useStore } from "../../store";
import { toast } from "../../ui/toast";
import { enrichConfigFromEnv, enrichWord } from "../../lib/llm-enrich";

/** Quick-capture input: type a word, hit enter, optionally enrich via LLM. */
export function QuickAdd() {
  const [val, setVal] = useState("");
  const vocab = useStore((s) => s.vocab);
  const addQuickWord = useStore((s) => s.addQuickWord);
  const applyEnrichment = useStore((s) => s.applyEnrichment);
  const setEnrichmentStatus = useStore((s) => s.setEnrichmentStatus);
  const cfg = enrichConfigFromEnv();

  async function doAdd() {
    const v = val.trim();
    if (!v) return;
    setVal("");
    const { id, duplicate } = addQuickWord(v);
    if (duplicate) {
      toast("已在词库");
      return;
    }
    if (!cfg) {
      toast("已加入（AI 未连接，可手动补释义）");
      return;
    }
    try {
      const e = await enrichWord(v, cfg);
      applyEnrichment(id, e);
      toast(v + " 已就绪");
    } catch {
      setEnrichmentStatus(id, "failed");
      toast(v + " 富化失败，可手动补充");
    }
  }

  const pending = vocab
    .filter((w) => w.enrichmentStatus === "loading" || w.enrichmentStatus === "failed")
    .slice(-12);

  return (
    <div className="quick-add">
      <div className="qa-row">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") doAdd();
          }}
          placeholder="速记新词，回车加入"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
        />
        <button onClick={doAdd}>+ 加入</button>
      </div>
      <div className="qa-status">
        {cfg
          ? "已连接 AI 富化：输入英文词，自动补音标、释义、例句"
          : "AI 富化未连接：保存为简单词条（在 .env 配置 VITE_LLM_* 后启用）"}
      </div>
      <div className="qa-pending">
        {pending.map((w) => (
          <span
            key={w.id}
            className={"qa-chip " + (w.enrichmentStatus === "loading" ? "loading" : "failed")}
            title={w.enrichmentStatus === "loading" ? "AI 富化中…" : "富化失败，可手动补充释义"}
          >
            {w.enrichmentStatus === "loading" ? (
              <>
                <span className="qa-spin" />
                {w.word}
              </>
            ) : (
              <>⚠ {w.word}</>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
