# Masked Ball - 游戏架构设计文档

## 一、游戏叙事概要

### 背景故事
一个警探/通灵人追踪恶魔到地狱，试图带回亲人的灵魂。地狱之主路西法提出挑战：

> "这里有九个徘徊于生死边缘的灵魂，其中六个有罪，三个无罪。你要判定谁是罪人，谁是义人，并且让善良的灵魂活下来。"

### 核心规则
- **9个灵魂**：6个有罪（Evil），3个无罪（Good）
- **善恶面具**：隐藏灵魂的真实阵营
- **罪人动机**：杀死身边的善良灵魂可获得痛苦豁免

---

## 二、核心玩法机制

### 2.1 九宫格布局
```
┌───┬───┬───┐
│1-1│2-1│3-1│
├───┼───┼───┤
│1-2│2-2│3-2│
├───┼───┼───┤
│1-3│2-3│3-3│
└───┴───┴───┘
```

### 2.2 相邻规则（仅正交方向）
```
      [上]
       ↑
[左] ← ● → [右]    ✓ 上下左右互相影响
       ↓
      [下]

    ↖   ↗
      ●           ✗ 对角线不互相影响
    ↙   ↘
```

### 2.3 杀伤判定规则

| 攻击者 | 目标 | 结果 |
|-------|------|------|
| 弱恶 (Weak Evil) | 弱善 (Weak Good) | ☠️ 杀死 |
| 弱恶 (Weak Evil) | 强善 (Strong Good) | ✓ 无效 |
| 强恶 (Strong Evil) | 弱善 (Weak Good) | ☠️ 杀死 |
| 强恶 (Strong Evil) | 强善 (Strong Good) | ☠️ 杀死 |
| 任何恶 | 任何恶 | ✓ 不互相影响 |
| 任何善 | 任何人 | ✓ 善不攻击 |

### 2.4 胜利条件
- 所有3个善良灵魂都存活（不被相邻的恶灵杀死）

---

## 三、代码架构

### 3.1 核心类图

```
CharacterCore.cs (枚举定义)
├── CharacterID      : Soul01-Soul09
├── Alignment        : Good / Evil
├── StrengthTier     : Weak / Strong
├── SinType          : None / Pride / Greed / Wrath / Lust / Envy / Sloth / Gluttony
├── DeathType        : Unknown / Suffocation / Burn / Fall / ...
└── KillRules        : 杀伤判定静态工具类

SoulProfile.cs (ScriptableObject)
├── Identity         : characterID, displayName, portrait, maskSprite
├── Judgement        : maskAlignment, trueAlignment, strength, sin
├── Four Questions   : answerWhoAreYou, answerHowDidYouDie, answerRegrets, answerAreYouGuilty
├── Pocket Items     : List<EvidenceItem>
├── Item Dialogues   : List<ItemDialogue>
└── Remarks          : skullRemark, luciferRemark

GridManager.cs
├── Grid Data        : GridCell[3,3]
├── Character Ops    : RegisterCharacter, TrySwap, SnapToCell
├── Adjacency        : GetOrthogonalNeighbors, AreOrthogonallyAdjacent
└── Evaluation       : EvaluateOutcome, IsVictoryState

LocalizationManager.cs
├── CurrentLanguage  : SystemLanguage (zh/en)
├── Events           : OnLanguageChanged
└── Methods          : SetChinese, SetEnglish, ToggleLanguage

DialogueTree.cs
├── DialogueTree     : 对话树结构
├── DialogueNode     : 支持本地化的对话节点
└── LocalizedText    : 多语言文本容器
```

### 3.2 数据流

```
┌─────────────────────────────────────────────────────────────────┐
│                        游戏流程                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 1. 初始化: GridManager 加载 9个 Character + SoulProfile        │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. 玩家交互                                                      │
│    ├── 拖拽角色 → GameManager.TryPick/Drag/Drop                 │
│    │              → GridManager.TrySwap                         │
│    │                                                            │
│    └── 点击角色 → Character.OnClick                             │
│                  → RoleSelectUI.ShowRole                        │
│                  → 显示角色详情页                                │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. 角色详情页                                                    │
│    ├── 左侧: 4个通用问题 → SoulProfile.GetQuestionAnswer(0-3)   │
│    │         点击问题 → 播放对话 (打字机效果)                    │
│    │                                                            │
│    └── 右侧: 物品栏 → SoulProfile.pocketItems                   │
│              点击物品 → SoulProfile.GetItemDialogue(itemId)     │
│                      → 播放物品对话                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. 确认布局 → GridManager.EvaluateOutcome()                     │
│    ├── 返回被杀死的善良灵魂列表                                  │
│    └── GridManager.IsVictoryState() 判断是否胜利                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 四、待实现功能

### 4.1 对话UI系统

**需要创建的组件：**

```csharp
// DialogueUIManager.cs - 对话UI管理器
public class DialogueUIManager : MonoBehaviour
{
    [Header("UI References")]
    public GameObject dialoguePanel;        // 对话面板
    public Image speakerPortrait;           // 说话者立绘
    public TMP_Text speakerNameText;        // 说话者名称
    public TMP_Text dialogueText;           // 对话内容
    public Button continueButton;           // 继续按钮（或点击区域）

    [Header("Typewriter")]
    public float charactersPerSecond = 30f; // 打字速度

    private DialogueTree currentTree;
    private DialogueNode currentNode;
    private Coroutine typingCoroutine;
    private bool isTyping;

    public void StartDialogue(DialogueTree tree) { ... }
    public void ShowNode(DialogueNode node) { ... }
    public void OnContinueClicked() { ... }
    private IEnumerator TypeText(string text) { ... }
}
```

**UI层级结构建议：**
```
DialoguePanel (Canvas)
├── Background (Image) - 半透明遮罩
├── DialogueBox (Image) - 对话框背景
│   ├── SpeakerPortrait (Image) - 左侧立绘
│   ├── SpeakerName (TMP_Text) - 名字
│   ├── DialogueText (TMP_Text) - 对话内容
│   └── ContinueIndicator (Image) - 继续提示箭头
└── ClickArea (Button) - 全屏点击区域
```

### 4.2 角色详情页

**需要创建的组件：**

```csharp
// CharacterDetailUI.cs - 角色详情页
public class CharacterDetailUI : MonoBehaviour
{
    [Header("Character Display")]
    public Image characterPortrait;
    public TMP_Text characterName;

    [Header("Question Buttons (左侧)")]
    public Button[] questionButtons;  // 4个问题按钮

    [Header("Item Slots (右侧)")]
    public Transform itemContainer;
    public GameObject itemSlotPrefab;

    [Header("References")]
    public DialogueUIManager dialogueUI;

    private SoulProfile currentProfile;

    public void ShowCharacter(SoulProfile profile) { ... }
    public void OnQuestionClicked(int questionIndex) { ... }
    public void OnItemClicked(string itemId) { ... }
}
```

### 4.3 通用问题配置

**4个通用问题（Inspector中可配置）：**

| 索引 | 问题 (中文) | 问题 (English) |
|-----|------------|----------------|
| 0 | 你是谁？ | Who are you? |
| 1 | 你是怎么死的？ | How did you die? |
| 2 | 你有什么遗憾？ | Any regrets? |
| 3 | 你觉得自己有罪吗？ | Do you think you're guilty? |

**在SoulProfile中配置回答：**
```
answerWhoAreYou:
  zh: "我叫张三，生前是个商人..."
  en: "My name is Zhang San, I was a merchant..."

answerHowDidYouDie:
  zh: "我死于一场意外..."
  en: "I died in an accident..."
```

---

## 五、本地化使用指南

### 5.1 LocalizedText 结构

```csharp
[Serializable]
public class LocalizedText
{
    [TextArea] public string zh;    // 中文
    [TextArea] public string en;    // English
}
```

### 5.2 在Inspector中配置

```yaml
SoulProfile:
  displayName: "6号灵魂"           # 旧格式（不支持本地化）

  answerWhoAreYou:                  # 新格式（支持本地化）
    zh: "我是一个迷失的灵魂..."
    en: "I am a lost soul..."
```

### 5.3 在代码中使用

```csharp
// 获取当前语言文本
string text = profile.answerWhoAreYou.Get();

// 获取指定语言文本
string zhText = profile.answerWhoAreYou.Get(SystemLanguage.Chinese);

// 切换语言
LocalizationManager.ToggleLanguage();

// 监听语言变更
LocalizationManager.OnLanguageChanged += (lang) => {
    RefreshUI();
};
```

---

## 六、Inspector配置清单

### 6.1 GameManager
| 字段 | 类型 | 说明 |
|-----|------|------|
| grid | GridManager | 拖入GridManager |
| characterParent | Transform | 角色父物体 |
| focusPanel | RoleSelectUI | 拖入焦点面板（可选，用于阻挡输入） |

### 6.2 GridManager
| 字段 | 类型 | 说明 |
|-----|------|------|
| width | int | 网格宽度 (3) |
| height | int | 网格高度 (3) |
| gridParent | Transform | 网格单元父物体 |

### 6.3 Character
| 字段 | 类型 | 说明 |
|-----|------|------|
| profile | SoulProfile | 拖入角色的SoulProfile资源 |
| CharacterFocus | RoleSelectUI | 拖入焦点面板 |

### 6.4 SoulProfile (ScriptableObject)
| 字段 | 类型 | 说明 |
|-----|------|------|
| characterID | CharacterID | Soul01-Soul09 |
| displayName | string | 显示名称 |
| portrait | Sprite | 角色立绘 |
| maskSprite | Sprite | 面具图像 |
| maskAlignment | Alignment | 面具阵营 |
| trueAlignment | Alignment | 真实阵营 |
| strength | StrengthTier | Weak/Strong |
| sin | SinType | 罪行类型 |
| answerWhoAreYou | LocalizedText | Q1回答 |
| answerHowDidYouDie | LocalizedText | Q2回答 |
| answerRegrets | LocalizedText | Q3回答 |
| answerAreYouGuilty | LocalizedText | Q4回答 |
| pocketItems | List | 物品列表 |
| itemDialogues | List | 物品对话 |

---

## 七、文件变更清单

| 文件 | 状态 | 说明 |
|------|------|------|
| `CharacterCore.cs` | 修改 | 简化枚举 + 添加KillRules |
| `GridManager.cs` | 修改 | 添加相邻判定和杀伤评估 |
| `SoulProfile.cs` | 修改 | 添加4问答 + 本地化支持 |
| `DialogueTree.cs` | 修改 | 节点添加本地化支持 |
| `LocalizationManager.cs` | 新增 | 本地化管理器 |

---

*文档版本: 2.0*
*更新时间: 2026-02-01*
