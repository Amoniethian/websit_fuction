# Masked Ball - 游戏架构设计与代码审查

## 一、发现的问题与已修复项

### 1. GameManager.cs - 逻辑冲突

| 问题 | 严重程度 | 状态 |
|------|---------|------|
| 焦点面板打开时仍可拖拽角色 | 高 | 已修复 |
| 拖拽中途打开UI导致状态混乱 | 高 | 已修复 |

**修复内容：**
- 添加 `IsUIBlocking` 属性检测UI状态
- 在 `Update()` 中添加UI阻挡检测，阻止输入穿透
- 当UI打开时自动取消正在进行的拖拽并归位

```csharp
// 新增代码
public RoleSelectUI focusPanel;
private bool IsUIBlocking => focusPanel != null && focusPanel.IsShowing;
```

---

### 2. Character.cs - 空引用风险

| 问题 | 严重程度 | 状态 |
|------|---------|------|
| CharacterFocus 可能为null导致崩溃 | 高 | 已修复 |
| profile 可能为null导致崩溃 | 中 | 已修复 |
| OnClick不传递角色数据 | 中 | 已修复 |
| SetCellIndex每次都输出Debug.Log | 低 | 已修复 |

**修复内容：**
- 添加空引用检查和警告日志
- 获取SpriteRenderer用于传递角色图像
- 移除不必要的Debug.Log

---

### 3. RoleSelectUI.cs - 参数传递缺失

| 问题 | 严重程度 | 状态 |
|------|---------|------|
| ShowRole() 不接收任何参数 | 高 | 已修复 |
| focusSprite.sprite = null (占位符) | 高 | 已修复 |
| 无法获取当前显示的角色信息 | 中 | 已修复 |

**修复内容：**
- 添加 `IsShowing` 属性用于状态检测
- 添加 `CurrentProfile` 属性存储当前角色数据
- 重载 `ShowRole(SoulProfile, Sprite)` 接收角色数据

---

### 4. RoleButtonUI.cs - 未完成逻辑

| 问题 | 严重程度 | 状态 |
|------|---------|------|
| OnPointerClick获取sprite后未使用 | 高 | 已修复 |
| 缺少SoulProfile引用 | 中 | 已修复 |
| controller为null时无提示 | 低 | 已修复 |

**修复内容：**
- 添加 `soulProfile` 字段关联角色数据
- 完成点击逻辑调用 `controller.ShowRole()`
- 添加空引用警告

---

### 5. CharacterCore.cs - 枚举冲突

| 问题 | 严重程度 | 状态 |
|------|---------|------|
| Pride和Superbia重复(同为傲慢) | 高 | 已修复 |
| 枚举缺少默认值/Unknown | 中 | 已修复 |
| 格式不统一(缺少空格) | 低 | 已修复 |

**修复内容：**
- 合并Pride和Superbia为Pride
- 为CharacterID、Alignment、SinType、DeathType添加默认值
- 扩展DeathType添加Poison、Stabbing、Strangling
- 添加注释说明

---

### 6. DialogueTree.cs - 功能缺失

| 问题 | 严重程度 | 状态 |
|------|---------|------|
| 无法通过nodeId获取节点 | 高 | 已修复 |
| 无法验证对话树完整性 | 中 | 已修复 |
| 无法检查证据需求 | 中 | 已修复 |

**修复内容：**
- 添加节点缓存和 `GetNode()` 方法
- 添加 `GetStartNode()` 和 `GetNextNodes()` 方法
- 添加 `Validate()` 方法检查对话树完整性
- 添加 `CheckEvidenceRequirements()` 检查证据需求

---

## 二、操作手感优化建议

### 2.1 拖拽交互优化

| 优化项 | 当前状态 | 建议 | 优先级 |
|-------|---------|------|-------|
| 拖拽阈值 | 固定0.15f | 根据屏幕DPI动态调整，或提供设置选项 | 中 |
| 拖拽视觉反馈 | 无 | 拖拽时角色放大1.1x或添加阴影/发光 | 高 |
| 拖拽层级 | 不变 | 拖拽时提升sortingOrder确保在最上层 | 高 |
| 拖拽平滑度 | 直接跟随 | 添加Lerp平滑跟随，更有手感 | 中 |
| 无效放置反馈 | 静默归位 | 添加抖动动画或音效提示 | 中 |

**建议代码示例 - 拖拽视觉反馈：**
```csharp
// GameManager.cs 建议添加
[Header("Drag Feedback")]
public float dragScale = 1.1f;
public float dragSortingOffset = 10;

void TryPick()
{
    // ... existing code ...
    if (dragging != null)
    {
        originalScale = dragging.transform.localScale;
        originalSortingOrder = dragging.GetComponent<SpriteRenderer>().sortingOrder;
    }
}

void Drag()
{
    if (isDragging)
    {
        dragging.transform.localScale = originalScale * dragScale;
        dragging.GetComponent<SpriteRenderer>().sortingOrder = originalSortingOrder + dragSortingOffset;
    }
}
```

### 2.2 点击交互优化

| 优化项 | 当前状态 | 建议 | 优先级 |
|-------|---------|------|-------|
| 点击反馈 | 仅Debug.Log | 添加点击音效和视觉缩放动画 | 高 |
| 焦点面板动画 | 直接显示/隐藏 | 添加淡入淡出或缩放动画 | 高 |
| 遮罩点击 | 无响应 | 点击暗色遮罩区域也可关闭面板 | 中 |

**建议代码示例 - 面板动画：**
```csharp
// RoleSelectUI.cs 建议添加
using DG.Tweening; // DOTween

public void ShowRole(SoulProfile profile, Sprite sprite)
{
    // ... existing setup ...

    // 动画效果
    focusSprite.rectTransform.localScale = Vector3.zero;
    focusSprite.rectTransform.DOScale(Vector3.one * focusedScale, 0.3f).SetEase(Ease.OutBack);

    dim.color = new Color(0, 0, 0, 0);
    dim.DOFade(0.7f, 0.2f);
}
```

### 2.3 悬停交互优化

| 优化项 | 当前状态 | 建议 | 优先级 |
|-------|---------|------|-------|
| 悬停反馈 | Outline+Shadow | 添加缩放动画(1.05x)更直观 | 中 |
| 悬停音效 | 无 | 添加轻微悬停音效 | 低 |
| 悬停延迟 | 立即响应 | 添加50ms延迟避免快速划过时闪烁 | 低 |

### 2.4 网格交换优化

| 优化项 | 当前状态 | 建议 | 优先级 |
|-------|---------|------|-------|
| 交换动画 | 立即切换位置 | 添加平滑移动动画(0.2-0.3s) | 高 |
| 交换音效 | 无 | 添加交换成功/失败音效 | 中 |
| 目标预览 | 无 | 拖拽时高亮可放置的目标格子 | 高 |

**建议代码示例 - 交换动画：**
```csharp
// GridManager.cs 建议修改
public bool TrySwap(Vector2Int a, Vector2Int b)
{
    // ... validation code ...

    // 动画移动而非直接设置位置
    float duration = 0.25f;
    cb.transform.DOMove(grid[a.x, a.y].WorldPosition, duration).SetEase(Ease.OutQuad);
    ca.transform.DOMove(grid[b.x, b.y].WorldPosition, duration).SetEase(Ease.OutQuad);

    return true;
}
```

---

## 三、文本与对话管理结构优化建议

### 3.1 对话系统架构优化

| 优化项 | 当前问题 | 建议方案 | 优先级 |
|-------|---------|---------|-------|
| 对话状态管理 | 无状态追踪 | 创建DialogueManager管理对话进度 | 高 |
| 对话历史记录 | 无 | 记录已阅读对话用于回顾 | 中 |
| 条件分支 | 仅证据检查 | 支持多种条件类型(好感度、时间、已触发事件等) | 高 |
| 本地化支持 | 硬编码文本 | 使用文本ID + 本地化表 | 中 |

**建议新增文件 - DialogueManager.cs：**
```csharp
public class DialogueManager : MonoBehaviour
{
    public static DialogueManager Instance { get; private set; }

    // 当前对话状态
    public DialogueTree CurrentTree { get; private set; }
    public DialogueNode CurrentNode { get; private set; }

    // 已解锁证据
    private HashSet<string> unlockedEvidenceIds = new();

    // 对话历史
    private List<string> dialogueHistory = new();

    public void StartDialogue(SoulProfile profile)
    {
        CurrentTree = profile.dialogue;
        CurrentNode = CurrentTree.GetStartNode();
        ShowCurrentNode();
    }

    public void SelectOption(int optionIndex)
    {
        var nextNodes = CurrentTree.GetNextNodes(CurrentNode);
        var validNodes = nextNodes.Where(n => n.CheckEvidenceRequirements(unlockedEvidenceIds)).ToList();

        if (optionIndex < validNodes.Count)
        {
            dialogueHistory.Add(CurrentNode.nodeId);
            CurrentNode = validNodes[optionIndex];
            ShowCurrentNode();
        }
    }

    public void UnlockEvidence(string evidenceId)
    {
        unlockedEvidenceIds.Add(evidenceId);
    }
}
```

### 3.2 DialogueNode 结构优化

| 当前字段 | 问题 | 建议改进 |
|---------|------|---------|
| nodeId | 手动输入易出错 | 使用GUID自动生成 |
| text | 单一文本 | 支持富文本或分段显示 |
| next | 仅ID列表 | 改为带条件的跳转结构 |
| requiredEvidenceIds | 仅证据条件 | 扩展为通用条件系统 |

**建议结构改进：**
```csharp
[Serializable]
public class DialogueNode
{
    public string nodeId;
    public DialogueNodeType type;

    [TextArea] public string text;

    // 说话者信息
    public CharacterID speakerId;
    public string speakerOverride; // 可选覆盖名称

    // 带条件的跳转
    public List<DialogueTransition> transitions = new();

    // 触发效果
    public List<DialogueEffect> effects = new();
}

[Serializable]
public class DialogueTransition
{
    public string targetNodeId;
    public string optionText;           // 玩家选项显示文本
    public List<DialogueCondition> conditions = new();
}

[Serializable]
public class DialogueCondition
{
    public ConditionType type;          // Evidence, Affinity, Flag, Time
    public string key;
    public int value;
    public CompareOperator compareOp;   // Equal, Greater, Less
}

[Serializable]
public class DialogueEffect
{
    public EffectType type;             // UnlockEvidence, SetFlag, ChangeAffinity
    public string key;
    public int value;
}
```

### 3.3 文本显示优化

| 优化项 | 当前状态 | 建议方案 | 优先级 |
|-------|---------|---------|-------|
| 文本显示方式 | 未实现 | 打字机效果逐字显示 | 高 |
| 文本跳过 | 未实现 | 点击跳过当前文字动画 | 高 |
| 自动播放 | 未实现 | 可选自动继续对话 | 低 |
| 文本日志 | 未实现 | 可回看历史对话 | 中 |

**建议组件 - TypewriterEffect.cs：**
```csharp
public class TypewriterEffect : MonoBehaviour
{
    public TMP_Text textComponent;
    public float charactersPerSecond = 30f;

    private string fullText;
    private Coroutine typingCoroutine;

    public bool IsTyping => typingCoroutine != null;

    public void ShowText(string text)
    {
        fullText = text;
        if (typingCoroutine != null) StopCoroutine(typingCoroutine);
        typingCoroutine = StartCoroutine(TypeText());
    }

    public void SkipToEnd()
    {
        if (typingCoroutine != null)
        {
            StopCoroutine(typingCoroutine);
            typingCoroutine = null;
        }
        textComponent.text = fullText;
    }

    private IEnumerator TypeText()
    {
        textComponent.text = "";
        foreach (char c in fullText)
        {
            textComponent.text += c;
            yield return new WaitForSeconds(1f / charactersPerSecond);
        }
        typingCoroutine = null;
    }
}
```

### 3.4 证据系统优化

| 优化项 | 当前问题 | 建议方案 | 优先级 |
|-------|---------|---------|-------|
| 证据存储 | 内嵌在SoulProfile | 独立EvidenceDatabase | 中 |
| 证据关联 | 仅字符串ID | 使用ScriptableObject引用 | 中 |
| 证据状态 | 无 | 区分未发现/已发现/已展示 | 高 |

**建议新增 - EvidenceDatabase.cs：**
```csharp
[CreateAssetMenu(menuName = "MaskedBall/Evidence Database")]
public class EvidenceDatabase : ScriptableObject
{
    public List<EvidenceData> allEvidence = new();

    private Dictionary<string, EvidenceData> _cache;

    public EvidenceData GetEvidence(string id)
    {
        if (_cache == null)
        {
            _cache = allEvidence.ToDictionary(e => e.id);
        }
        return _cache.TryGetValue(id, out var result) ? result : null;
    }
}

[Serializable]
public class EvidenceData
{
    public string id;
    public string displayName;
    [TextArea] public string description;
    public Sprite icon;
    public EvidenceCategory category;
    public List<EvidenceData> relatedEvidence;
}

public enum EvidenceCategory
{
    Physical,       // 物证
    Testimonial,    // 证言
    Documentary,    // 文件
    Circumstantial  // 间接证据
}
```

---

## 四、优化优先级总览

### 高优先级 (建议立即处理)
1. 拖拽视觉反馈 - 影响核心交互体验
2. 拖拽层级提升 - 避免视觉混乱
3. 焦点面板动画 - 提升UI流畅度
4. 目标格子预览 - 提升拖拽体验
5. 交换动画 - 核心交互反馈
6. 对话状态管理器 - 系统基础设施
7. 条件分支扩展 - 剧情复杂度支持

### 中优先级 (建议近期处理)
1. 拖拽阈值动态调整
2. 拖拽平滑跟随
3. 无效放置反馈
4. 遮罩点击关闭
5. 对话历史记录
6. 本地化支持
7. 证据状态系统

### 低优先级 (可延后处理)
1. 悬停音效
2. 悬停延迟
3. 自动播放对话
4. 悬停缩放动画

---

## 五、文件修改清单

| 文件 | 修改类型 | 说明 |
|------|---------|------|
| `Assets/Scripts/GameManager.cs` | 修改 | 添加UI阻挡检测 |
| `Assets/Scripts/Character.cs` | 修改 | 添加空引用检查和数据传递 |
| `Assets/Scripts/RoleSelectUI.cs` | 修改 | 添加状态属性和参数传递 |
| `Assets/UI/RoleButtonUI.cs` | 修改 | 完成点击逻辑 |
| `Assets/Scripts/CharacterCore.cs` | 修改 | 修复枚举冲突 |
| `Assets/Scripts/DialogueTree.cs` | 修改 | 添加节点访问方法 |

---

*文档生成时间: 2026-02-01*
*审查范围: Assets/Scripts/, Assets/UI/*
