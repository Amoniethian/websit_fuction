using System;
using System.Collections.Generic;
using UnityEngine;
using MaskedBall.CharacterCore;

[CreateAssetMenu(menuName = "MaskedBall/Soul Profile", fileName = "Soul_Profile")]
public class SoulProfile : ScriptableObject
{
    [Header("Identity")]
    public CharacterID characterID;
    public string displayName;

    [Header("Visual")]
    public Sprite portrait;         // 角色立绘
    public Sprite maskSprite;       // 面具图像

    [Header("Judgement")]
    public Alignment maskAlignment; // 面具显示的阵营（可能是伪装）
    public Alignment trueAlignment; // 真实阵营
    public StrengthTier strength;   // 力量等级
    public SinType sin;             // 罪行类型（善良灵魂为None）
    public DeathType deathType;

    [TextArea] public string deathDetail;

    [Header("Story")]
    [TextArea(6, 20)] public string backstory;

    [Header("Four Questions (通用问题回答)")]
    [Tooltip("Q1: 你是谁？")]
    public LocalizedText answerWhoAreYou;

    [Tooltip("Q2: 你是怎么死的？")]
    public LocalizedText answerHowDidYouDie;

    [Tooltip("Q3: 你有什么遗憾？")]
    public LocalizedText answerRegrets;

    [Tooltip("Q4: 你觉得自己有罪吗？")]
    public LocalizedText answerAreYouGuilty;

    [Header("Pocket Items (物品栏)")]
    public List<EvidenceItem> pocketItems = new();

    [Header("Item Dialogues (物品对话)")]
    [Tooltip("每个物品点击后的对话，key为物品id")]
    public List<ItemDialogue> itemDialogues = new();

    [Header("After Investigation")]
    public LocalizedText skullRemark;
    public LocalizedText luciferRemark;

    /// <summary>
    /// 根据物品ID获取对话
    /// </summary>
    public DialogueTree GetItemDialogue(string itemId)
    {
        var entry = itemDialogues.Find(d => d.itemId == itemId);
        return entry?.dialogue;
    }

    /// <summary>
    /// 根据问题索引获取回答 (0-3)
    /// </summary>
    public LocalizedText GetQuestionAnswer(int questionIndex)
    {
        return questionIndex switch
        {
            0 => answerWhoAreYou,
            1 => answerHowDidYouDie,
            2 => answerRegrets,
            3 => answerAreYouGuilty,
            _ => null
        };
    }
}

/// <summary>
/// 物品对话配置
/// </summary>
[Serializable]
public class ItemDialogue
{
    public string itemId;           // 对应EvidenceItem的id
    public DialogueTree dialogue;   // 点击该物品后的对话
}

/// <summary>
/// 证物/物品
/// </summary>
[Serializable]
public class EvidenceItem
{
    public string id;
    public LocalizedText displayName;
    public LocalizedText description;
    public Sprite icon;

    public List<string> relatedEvidenceIds = new();
}

/// <summary>
/// 本地化文本结构 - 支持多语言
/// 使用方式: 在Inspector中填写各语言文本，运行时根据当前语言获取
/// </summary>
[Serializable]
public class LocalizedText
{
    [TextArea] public string zh;    // 中文
    [TextArea] public string en;    // English

    /// <summary>
    /// 获取当前语言的文本
    /// </summary>
    public string Get()
    {
        return LocalizationManager.CurrentLanguage switch
        {
            SystemLanguage.Chinese => zh,
            SystemLanguage.ChineseSimplified => zh,
            SystemLanguage.ChineseTraditional => zh,
            SystemLanguage.English => en,
            _ => string.IsNullOrEmpty(en) ? zh : en
        };
    }

    /// <summary>
    /// 获取指定语言的文本
    /// </summary>
    public string Get(SystemLanguage lang)
    {
        return lang switch
        {
            SystemLanguage.Chinese => zh,
            SystemLanguage.ChineseSimplified => zh,
            SystemLanguage.ChineseTraditional => zh,
            SystemLanguage.English => en,
            _ => string.IsNullOrEmpty(en) ? zh : en
        };
    }

    // 隐式转换，方便使用
    public static implicit operator string(LocalizedText lt) => lt?.Get() ?? "";
}
