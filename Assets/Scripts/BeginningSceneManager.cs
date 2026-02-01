using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using System.Collections;

/// <summary>
/// Beginning场景管理器 - 管理文字播放页面
/// 页面按播放顺序为: 01, 02, 03...
/// </summary>
public class BeginningSceneManager : MonoBehaviour
{
    [Header("UI References")]
    public Image backgroundImage;    // 背景图片（黑底，可切换）
    public Text contentText;         // 中间的白色文字
    public Text hintText;            // 顶部的"点击继续"提示

    [Header("Typewriter Settings")]
    public float characterDelay = 0.05f;  // 每个字符的延迟时间

    [Header("Page Contents - 每页的文字内容")]
    [TextArea(3, 10)]
    public string page01 = "【第一页占位符】\n\n在一个被遗忘的王国里，\n每年都会举办一场神秘的假面舞会...";

    [TextArea(3, 10)]
    public string page02 = "【第二页占位符】\n\n没有人知道舞会的真正目的，\n只知道受邀者必须戴上面具。";

    [TextArea(3, 10)]
    public string page03 = "【第三页占位符】\n\n面具之下，身份不再重要，\n每个人都可以成为任何人。";

    [TextArea(3, 10)]
    public string page04 = "【第四页占位符】\n\n而你，一个普通的旅人，\n意外收到了一张镶金边的请柬...";

    [TextArea(3, 10)]
    public string page05 = "【第五页占位符】\n\n请柬上只有一句话：\n\"今夜，命运将在舞池中央揭晓。\"";

    [TextArea(3, 10)]
    public string page06 = "【第六页占位符】\n\n你推开了城堡的大门，\n踏入了这场命运的舞会...";

    [Header("Background Images - 每页的背景图（可选）")]
    public Sprite bg01;
    public Sprite bg02;
    public Sprite bg03;
    public Sprite bg04;
    public Sprite bg05;
    public Sprite bg06;

    [Header("Scene Settings")]
    public string nextSceneName = "grid";   // 最后跳转的场景

    [Header("Style Settings")]
    public int contentFontSize = 48;
    public int hintFontSize = 24;
    public string hintMessage = "点击继续";

    private string[] pageContents;
    private Sprite[] backgroundSprites;
    private int currentPageIndex = 0;
    private bool canClick = false;
    private bool isTyping = false;
    private Coroutine typingCoroutine;

    void Start()
    {
        // 初始化页面数组
        pageContents = new string[] { page01, page02, page03, page04, page05, page06 };
        backgroundSprites = new Sprite[] { bg01, bg02, bg03, bg04, bg05, bg06 };

        // 设置提示文字样式
        if (hintText != null)
        {
            hintText.text = hintMessage;
            hintText.fontSize = hintFontSize;
            hintText.color = new Color(0.5f, 0.5f, 0.5f, 1f);  // 深灰色
            hintText.alignment = TextAnchor.MiddleCenter;
        }

        // 设置内容文字样式
        if (contentText != null)
        {
            contentText.fontSize = contentFontSize;
            contentText.color = Color.white;
            contentText.alignment = TextAnchor.MiddleCenter;
        }

        // 设置背景为黑色
        if (backgroundImage != null)
        {
            backgroundImage.color = Color.black;
        }

        // 显示第一页
        ShowPage(0);
    }

    void Update()
    {
        // 检测点击或按键
        if (Input.GetMouseButtonDown(0) || Input.GetKeyDown(KeyCode.Space) || Input.GetKeyDown(KeyCode.Return))
        {
            OnClick();
        }
    }

    void OnClick()
    {
        // 如果正在打字，先显示完整文字
        if (isTyping)
        {
            ShowFullText();
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
        if (backgroundImage != null && backgroundSprites[pageIndex] != null)
        {
            backgroundImage.sprite = backgroundSprites[pageIndex];
            backgroundImage.color = Color.white;  // 有图片时显示原色
        }
        else if (backgroundImage != null)
        {
            backgroundImage.sprite = null;
            backgroundImage.color = Color.black;  // 无图片时显示黑色
        }

        // 开始打字效果
        StartTyping(pageContents[pageIndex]);
    }

    void StartTyping(string text)
    {
        if (typingCoroutine != null)
        {
            StopCoroutine(typingCoroutine);
        }
        typingCoroutine = StartCoroutine(TypeText(text));
    }

    IEnumerator TypeText(string fullText)
    {
        isTyping = true;
        canClick = false;

        if (contentText != null)
        {
            contentText.text = "";

            foreach (char c in fullText)
            {
                contentText.text += c;
                yield return new WaitForSeconds(characterDelay);
            }
        }

        isTyping = false;
        canClick = true;
    }

    void ShowFullText()
    {
        if (typingCoroutine != null)
        {
            StopCoroutine(typingCoroutine);
        }

        if (contentText != null && currentPageIndex < pageContents.Length)
        {
            contentText.text = pageContents[currentPageIndex];
        }

        isTyping = false;
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
    /// 获取当前页面编号（01, 02, 03...格式）
    /// </summary>
    public string GetCurrentPageNumber()
    {
        return (currentPageIndex + 1).ToString("D2");
    }
}
