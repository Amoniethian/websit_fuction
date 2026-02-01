using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public enum DialogueNodeType
{
    PlayerOption,   // 玩家选项
    NpcReply,       // NPC回复
    SystemRemark    // 系统备注
}

[Serializable]
public class DialogueTree
{
    public string startNodeId;
    public List<DialogueNode> nodes = new();

    // 节点缓存，用于快速查找
    [NonSerialized] private Dictionary<string, DialogueNode> _nodeCache;

    /// <summary>
    /// 获取起始节点
    /// </summary>
    public DialogueNode GetStartNode()
    {
        if (string.IsNullOrEmpty(startNodeId)) return null;
        return GetNode(startNodeId);
    }

    /// <summary>
    /// 根据ID获取节点
    /// </summary>
    public DialogueNode GetNode(string nodeId)
    {
        if (string.IsNullOrEmpty(nodeId)) return null;

        // 构建缓存
        if (_nodeCache == null)
        {
            _nodeCache = new Dictionary<string, DialogueNode>();
            foreach (var node in nodes)
            {
                if (!string.IsNullOrEmpty(node.nodeId))
                    _nodeCache[node.nodeId] = node;
            }
        }

        return _nodeCache.TryGetValue(nodeId, out var result) ? result : null;
    }

    /// <summary>
    /// 获取节点的所有后续节点
    /// </summary>
    public List<DialogueNode> GetNextNodes(DialogueNode node)
    {
        if (node == null || node.next == null) return new List<DialogueNode>();
        return node.next.Select(GetNode).Where(n => n != null).ToList();
    }

    /// <summary>
    /// 验证对话树完整性
    /// </summary>
    public bool Validate(out List<string> errors)
    {
        errors = new List<string>();

        if (string.IsNullOrEmpty(startNodeId))
            errors.Add("startNodeId 未设置");

        if (nodes == null || nodes.Count == 0)
        {
            errors.Add("对话树没有节点");
            return false;
        }

        // 检查起始节点是否存在
        if (!string.IsNullOrEmpty(startNodeId) && GetNode(startNodeId) == null)
            errors.Add($"起始节点 '{startNodeId}' 不存在");

        // 检查所有引用的节点是否存在
        foreach (var node in nodes)
        {
            if (string.IsNullOrEmpty(node.nodeId))
                errors.Add("存在没有ID的节点");

            if (node.next != null)
            {
                foreach (var nextId in node.next)
                {
                    if (GetNode(nextId) == null)
                        errors.Add($"节点 '{node.nodeId}' 引用了不存在的节点 '{nextId}'");
                }
            }
        }

        return errors.Count == 0;
    }

    /// <summary>
    /// 清除节点缓存（在修改nodes后调用）
    /// </summary>
    public void InvalidateCache()
    {
        _nodeCache = null;
    }
}

[Serializable]
public class DialogueNode
{
    public string nodeId;
    public DialogueNodeType type;

    [Tooltip("说话者名称（可选，留空则不显示）")]
    public LocalizedText speakerName;

    [Tooltip("对话内容")]
    public LocalizedText text;

    [Tooltip("说话者立绘（可选）")]
    public Sprite speakerPortrait;

    public List<string> next = new();
    public List<string> requiredEvidenceIds = new();

    /// <summary>
    /// 获取当前语言的文本
    /// </summary>
    public string GetText() => text?.Get() ?? "";

    /// <summary>
    /// 获取当前语言的说话者名称
    /// </summary>
    public string GetSpeakerName() => speakerName?.Get() ?? "";

    /// <summary>
    /// 检查是否满足显示此节点的证据要求
    /// </summary>
    public bool CheckEvidenceRequirements(HashSet<string> unlockedEvidenceIds)
    {
        if (requiredEvidenceIds == null || requiredEvidenceIds.Count == 0)
            return true;

        if (unlockedEvidenceIds == null)
            return false;

        return requiredEvidenceIds.All(id => unlockedEvidenceIds.Contains(id));
    }
}
