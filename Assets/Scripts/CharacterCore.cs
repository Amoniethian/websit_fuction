using UnityEngine;

namespace MaskedBall.CharacterCore
{
    /// <summary>
    /// 灵魂ID（9个参与审判的灵魂）
    /// </summary>
    public enum CharacterID
    {
        None = 0,
        Soul01 = 1,
        Soul02 = 2,
        Soul03 = 3,
        Soul04 = 4,
        Soul05 = 5,
        Soul06 = 6,
        Soul07 = 7,
        Soul08 = 8,
        Soul09 = 9
    }

    /// <summary>
    /// 善恶阵营（面具可能隐藏真实阵营）
    /// </summary>
    public enum Alignment
    {
        Good,   // 善（无辜者，共3人）
        Evil    // 恶（罪人，共6人）
    }

    /// <summary>
    /// 力量等级（影响杀伤判定）
    /// </summary>
    public enum StrengthTier
    {
        Weak,   // 弱
        Strong  // 强
    }

    /// <summary>
    /// 七宗罪类型（6个罪人各有其罪）
    /// </summary>
    public enum SinType
    {
        None = 0,       // 无罪（善良灵魂）
        Pride,          // 傲慢
        Greed,          // 贪婪
        Wrath,          // 暴怒
        Lust,           // 色欲
        Envy,           // 嫉妒
        Sloth,          // 懒惰
        Gluttony        // 暴食
    }

    /// <summary>
    /// 死亡方式（用于叙事）
    /// </summary>
    public enum DeathType
    {
        Unknown = 0,
        Suffocation,    // 窒息
        Burn,           // 烧死
        Fall,           // 坠落
        Drowning,       // 溺水
        HeartAttack,    // 心脏病发
        Poison,         // 中毒
        Stabbing,       // 刺杀
        Strangling      // 勒死
    }

    /// <summary>
    /// 杀伤判定工具类
    /// 规则：
    /// - 弱善 被 弱恶 杀
    /// - 强善 不受 弱恶 影响
    /// - 强善 被 强恶 杀
    /// - 恶与恶 不互相影响
    /// </summary>
    public static class KillRules
    {
        /// <summary>
        /// 判断攻击者能否杀死目标
        /// </summary>
        /// <param name="attackerAlign">攻击者的真实阵营</param>
        /// <param name="attackerStrength">攻击者的力量</param>
        /// <param name="targetAlign">目标的真实阵营</param>
        /// <param name="targetStrength">目标的力量</param>
        /// <returns>是否能杀死</returns>
        public static bool CanKill(Alignment attackerAlign, StrengthTier attackerStrength,
                                   Alignment targetAlign, StrengthTier targetStrength)
        {
            // 只有恶能攻击
            if (attackerAlign != Alignment.Evil) return false;

            // 恶不攻击恶
            if (targetAlign == Alignment.Evil) return false;

            // 恶攻击善的情况
            // 弱恶 vs 弱善 → 杀
            // 弱恶 vs 强善 → 不能杀
            // 强恶 vs 弱善 → 杀
            // 强恶 vs 强善 → 杀

            if (attackerStrength == StrengthTier.Weak && targetStrength == StrengthTier.Strong)
                return false;

            return true;
        }

        /// <summary>
        /// 判断目标是否会被攻击者杀死（便捷方法）
        /// </summary>
        public static bool WillBeKilled(SoulProfile attacker, SoulProfile target)
        {
            if (attacker == null || target == null) return false;
            return CanKill(attacker.trueAlignment, attacker.strength,
                          target.trueAlignment, target.strength);
        }
    }
}
