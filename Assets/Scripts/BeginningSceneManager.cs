using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using System.Collections;
using TMPro;

/// <summary>
/// Beginning场景管理器 - 管理文字播放页面
/// </summary>
public class BeginningSceneManager : MonoBehaviour
{
    [Header("UI References")]
    public Image backgroundImage;           // 背景图片（黑底，可切换）
    public TextMeshProUGUI contentText;     // 中间的白色文字
    public TextMeshProUGUI hintText;        // 顶部的"点击继续"提示
    public TypewriterEffect typewriter;     // 打字机效果组件

    [Header("Page Settings")]
    [TextArea(3, 10)]
    public string[] pageContents;           // 每一页的文字内容

    [Header("Background Images")]
    public Sprite[] backgroundSprites;      // 每一页的背景图片（可选，不设置则保持黑底）

    [Header("Scene Settings")]
    public string nextSceneName = "grid";   // 最后跳转的场景

    [Header("Style Settings")]
    public Color textColor = Color.white;
    public Color hintColor = new Color(0.4f, 0.4f, 0.4f, 1f);  // 深灰色
    public string hintMessage = "点击继续";

    private int currentPageIndex = 0;
    private bool canClick = false;

    void Start()
    {
        // 初始化页面内容（如果没有设置，使用占位符）
        if (pageContents == null || pageContents.Length == 0)
        {
            InitializeDefaultContent();
        }

        // 设置提示文字
        if (hintText != null)
        {
            hintText.text = hintMessage;
            hintText.color = hintColor;
        }

        // 设置内容文字颜色
        if (contentText != null)
        {
            contentText.color = textColor;
        }

        // 显示第一页
        ShowPage(0);
    }

    void Update()
    {
        // 检测点击
        if (Input.GetMouseButtonDown(0) || Input.GetKeyDown(KeyCode.Space) || Input.GetKeyDown(KeyCode.Return))
        {
            OnClick();
        }
    }

    void OnClick()
    {
        // 如果正在打字，先显示完整文字
        if (typewriter != null && typewriter.IsTyping)
        {
            typewriter.ShowFullText();
            canClick = true;
            return;
        }

        // 如果可以点击，切换到下一页
        if (canClick)
        {
            NextPage();
        }
    }

    void ShowPage(int pageIndex)
    {
        if (pageIndex < 0 || pageIndex >= pageContents.Length)
        {
            return;
        }

        currentPageIndex = pageIndex;
        canClick = false;

        // 更新页面名称（用于调试）
        Debug.Log($"Showing page: {(pageIndex + 1):D2}");

        // 设置背景图片（如果有）
        if (backgroundImage != null && backgroundSprites != null && pageIndex < backgroundSprites.Length && backgroundSprites[pageIndex] != null)
        {
            backgroundImage.sprite = backgroundSprites[pageIndex];
        }

        // 开始打字效果
        if (typewriter != null)
        {
            typewriter.StartTyping(pageContents[pageIndex]);
            StartCoroutine(WaitForTypingComplete());
        }
        else if (contentText != null)
        {
            contentText.text = pageContents[pageIndex];
            canClick = true;
        }
    }

    IEnumerator WaitForTypingComplete()
    {
        while (typewriter != null && typewriter.IsTyping)
        {
            yield return null;
        }
        canClick = true;
    }

    void NextPage()
    {
        int nextIndex = currentPageIndex + 1;

        // 如果是最后一页，加载下一个场景
        if (nextIndex >= pageContents.Length)
        {
            LoadNextScene();
            return;
        }

        ShowPage(nextIndex);
    }

    void LoadNextScene()
    {
        Debug.Log("Loading next scene: " + nextSceneName);
        SceneManager.LoadScene(nextSceneName);
    }

    /// <summary>
    /// 初始化默认占位符内容
    /// </summary>
    void InitializeDefaultContent()
    {
        pageContents = new string[]
        {
            // 01
            "在一个被遗忘的王国里，\n每年都会举办一场神秘的假面舞会...",

            // 02
            "没有人知道舞会的真正目的，\n只知道受邀者必须戴上面具。",

            // 03
            "面具之下，身份不再重要，\n每个人都可以成为任何人。",

            // 04
            "而你，一个普通的旅人，\n意外收到了一张镶金边的请柬...",

            // 05
            "请柬上只有一句话：\n\"今夜，命运将在舞池中央揭晓。\"",

            // 06
            "你推开了城堡的大门，\n踏入了这场命运的舞会..."
        };
    }

    /// <summary>
    /// 获取当前页面编号（01, 02, 03...格式）
    /// </summary>
    public string GetCurrentPageNumber()
    {
        return (currentPageIndex + 1).ToString("D2");
    }

    /// <summary>
    /// 跳转到指定页面
    /// </summary>
    public void GoToPage(int pageIndex)
    {
        if (pageIndex >= 0 && pageIndex < pageContents.Length)
        {
            ShowPage(pageIndex);
        }
    }

    /// <summary>
    /// 设置页面内容
    /// </summary>
    public void SetPageContent(int pageIndex, string content)
    {
        if (pageIndex >= 0 && pageIndex < pageContents.Length)
        {
            pageContents[pageIndex] = content;
        }
    }
}
