import { useStore } from "../../store";
import type { CreatureType } from "../../types";
import { ICONS } from "../../lib/icons";

const ITEMS: [CreatureType, string][] = [
  ["smallFish", "小鱼"], ["moonFish", "月亮鱼"], ["clownfish", "小丑鱼"], ["bigFish", "大鱼"],
  ["turtle", "海龟"], ["seaweed", "海草"], ["anemone", "海葵"], ["coral", "珊瑚"]
];

export function Species() {
  const inv = useStore((s) => s.inv);
  return (
    <div className="pane">
      <div className="inv-grid">
        {ITEMS.map(([k, l]) => (
          <div className="inv-item" key={k}>
            <div className="ic">{ICONS[k]}</div>
            <div className="num">{inv[k]}</div>
            <div className="lbl">{l}</div>
          </div>
        ))}
      </div>
      <div className="inv-note">
        转化规则：50 小鱼 → 留 25 + 奖牌；15 月亮鱼 → 留 5 + 奖牌；10 小丑鱼 → 留 5 + 奖牌；4 大鱼 → 留 1 + 奖牌。
        20 海草 → 留 5 + 奖牌；10 海葵 → 留 5 + 奖牌；8 珊瑚 → 留 2 + 奖牌。海龟只累计、不转化。
      </div>
    </div>
  );
}
