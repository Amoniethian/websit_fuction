import { useLang, setLang, TARGET_LANGS, NATIVE_LANGS } from "../../lib/lang";

/** Picks the study language pair: what you're learning, and what to explain it in. */
export function LangSettings() {
  const { target, native } = useLang();
  return (
    <div className="cos-section">
      <h3>学习语言</h3>
      <div style={{ fontSize: 11, color: "var(--ink-soft)", lineHeight: 1.7, marginBottom: 8 }}>
        想学什么语言就填什么——AI 富化、朗读、学习/复习里的提示都会跟着切换。释义与翻译用「母语」书写。
      </div>
      <div className="ai-row">
        <label>我在学</label>
        <input
          list="target-langs"
          value={target}
          onChange={(e) => setLang({ target: e.target.value, native })}
          placeholder="英语 / 日语 / 法语…"
        />
        <datalist id="target-langs">
          {TARGET_LANGS.map((l) => (
            <option key={l} value={l} />
          ))}
        </datalist>
      </div>
      <div className="ai-row">
        <label>用此语言解释</label>
        <input
          list="native-langs"
          value={native}
          onChange={(e) => setLang({ target, native: e.target.value })}
          placeholder="中文 / English…"
        />
        <datalist id="native-langs">
          {NATIVE_LANGS.map((l) => (
            <option key={l} value={l} />
          ))}
        </datalist>
      </div>
    </div>
  );
}
