using System.Collections.Generic;
using UnityEngine;
using MaskedBall.CharacterCore;

public class GridManager : MonoBehaviour
{
    public int width = 3;
    public int height = 3;
    public Transform gridParent;

    private GridCell[,] grid;

    // 正交方向（上下左右，不含对角线）
    private static readonly Vector2Int[] OrthogonalDirections = {
        new Vector2Int(0, 1),   // 上
        new Vector2Int(0, -1),  // 下
        new Vector2Int(-1, 0),  // 左
        new Vector2Int(1, 0)    // 右
    };

    void Awake()
    {
        grid = new GridCell[width, height];

        foreach (Transform child in gridParent)
        {
            string[] parts = child.name.Split('-');
            int x = int.Parse(parts[0]) - 1;
            int y = int.Parse(parts[1]) - 1;

            grid[x, y] = new GridCell(child.position);
        }
    }

    public void RegisterCharacter(Character c, Vector2Int idx)
    {
        grid[idx.x, idx.y].Place(c);
        c.SetCellIndex(idx);
        c.transform.position = grid[idx.x, idx.y].WorldPosition;
    }

    public Vector2Int FindNearestCellIndex(Vector2 worldPos)
    {
        float best = float.MaxValue;
        Vector2Int bestIdx = new Vector2Int(-1, -1);

        for (int x = 0; x < width; x++)
            for (int y = 0; y < height; y++)
            {
                float d = ((Vector2)grid[x, y].WorldPosition - worldPos).sqrMagnitude;
                if (d < best)
                {
                    best = d;
                    bestIdx = new Vector2Int(x, y);
                }
            }
        return bestIdx;
    }

    public bool IsInBounds(Vector2Int idx)
    {
        return idx.x >= 0 && idx.x < width && idx.y >= 0 && idx.y < height;
    }

    public Character GetOccupant(Vector2Int idx) => grid[idx.x, idx.y].Occupant;

    public void SnapToCell(Character c)
    {
        var idx = c.CellIndex;
        c.transform.position = grid[idx.x, idx.y].WorldPosition;
    }

    public bool TrySwap(Vector2Int a, Vector2Int b)
    {
        if (!IsInBounds(a) || !IsInBounds(b)) return false;
        if (a == b) return false;

        Character ca = grid[a.x, a.y].Occupant;
        Character cb = grid[b.x, b.y].Occupant;

        // 两个格子都必须有角色才能交换
        if (ca == null || cb == null) return false;

        // 数据层交换
        grid[a.x, a.y].Place(cb);
        grid[b.x, b.y].Place(ca);

        // 更新角色索引
        cb.SetCellIndex(a);
        ca.SetCellIndex(b);

        // 表现层对齐
        cb.transform.position = grid[a.x, a.y].WorldPosition;
        ca.transform.position = grid[b.x, b.y].WorldPosition;

        return true;
    }

    #region 相邻判定（仅上下左右，不含对角线）

    /// <summary>
    /// 获取指定位置的所有正交相邻角色（上下左右）
    /// </summary>
    public List<Character> GetOrthogonalNeighbors(Vector2Int idx)
    {
        var neighbors = new List<Character>();

        foreach (var dir in OrthogonalDirections)
        {
            Vector2Int neighborIdx = idx + dir;
            if (IsInBounds(neighborIdx))
            {
                Character neighbor = GetOccupant(neighborIdx);
                if (neighbor != null)
                    neighbors.Add(neighbor);
            }
        }

        return neighbors;
    }

    /// <summary>
    /// 判断两个位置是否正交相邻（上下左右）
    /// </summary>
    public bool AreOrthogonallyAdjacent(Vector2Int a, Vector2Int b)
    {
        int dx = Mathf.Abs(a.x - b.x);
        int dy = Mathf.Abs(a.y - b.y);

        // 正交相邻：曼哈顿距离为1（横或竖差1，另一个差0）
        return (dx == 1 && dy == 0) || (dx == 0 && dy == 1);
    }

    #endregion

    #region 杀伤判定

    /// <summary>
    /// 评估当前布局的结果，返回所有会被杀死的善良灵魂
    /// </summary>
    public List<Character> EvaluateOutcome()
    {
        var killed = new List<Character>();

        for (int x = 0; x < width; x++)
        {
            for (int y = 0; y < height; y++)
            {
                Vector2Int idx = new Vector2Int(x, y);
                Character target = GetOccupant(idx);

                if (target == null || target.profile == null) continue;

                // 只检查善良灵魂是否会被杀
                if (target.profile.trueAlignment != Alignment.Good) continue;

                // 检查所有相邻的恶灵是否能杀死这个善良灵魂
                var neighbors = GetOrthogonalNeighbors(idx);
                foreach (var neighbor in neighbors)
                {
                    if (neighbor.profile == null) continue;

                    if (KillRules.WillBeKilled(neighbor.profile, target.profile))
                    {
                        if (!killed.Contains(target))
                            killed.Add(target);
                        break; // 已经被杀，不需要继续检查
                    }
                }
            }
        }

        return killed;
    }

    /// <summary>
    /// 检查当前布局是否是胜利状态（所有善良灵魂都存活）
    /// </summary>
    public bool IsVictoryState()
    {
        return EvaluateOutcome().Count == 0;
    }

    /// <summary>
    /// 获取所有善良灵魂
    /// </summary>
    public List<Character> GetAllGoodSouls()
    {
        var goodSouls = new List<Character>();

        for (int x = 0; x < width; x++)
        {
            for (int y = 0; y < height; y++)
            {
                Character c = GetOccupant(new Vector2Int(x, y));
                if (c != null && c.profile != null &&
                    c.profile.trueAlignment == Alignment.Good)
                {
                    goodSouls.Add(c);
                }
            }
        }

        return goodSouls;
    }

    /// <summary>
    /// 获取所有恶灵
    /// </summary>
    public List<Character> GetAllEvilSouls()
    {
        var evilSouls = new List<Character>();

        for (int x = 0; x < width; x++)
        {
            for (int y = 0; y < height; y++)
            {
                Character c = GetOccupant(new Vector2Int(x, y));
                if (c != null && c.profile != null &&
                    c.profile.trueAlignment == Alignment.Evil)
                {
                    evilSouls.Add(c);
                }
            }
        }

        return evilSouls;
    }

    #endregion
}
