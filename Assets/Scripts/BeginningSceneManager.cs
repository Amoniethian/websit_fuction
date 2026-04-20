using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using System.Collections;

/// <summary>
/// Beginning场景管理器 - 管理文字播放页面
/// 页面按播放顺序为: 01, 02, 03...
///
/// 功能：
/// - 黑底背景（可为每页设置不同背景图）
/// - 中间显示白色文字，打字机效果
/// - 顶部深灰色小字显示"点击继续"
/// - 点击切换到下一页
/// - 最后一页点击后跳转到grid场景
/// </summary>
public class BeginningSceneManager : MonoBehaviour
{
    [Header("=== UI引用 ===")]
    [Tooltip("背景图片组件（黑底，可切换）")]
    public Image backgroundImage;

    [Tooltip("中间的白色文字")]
    public Text contentText;

    [Tooltip("顶部的提示文字")]
    public Text hintText;

    [Header("=== 打字机设置 ===")]
    [Tooltip("每个字符显示的间隔时间")]
    public float characterDelay = 0.05f;

    [Header("=== 页面内容（01-06） ===")]
    [TextArea(3, 10)]
    public string page01 = "【第01页 - 占位符文本】\n\n这里是第一页的故事内容...\n请在Inspector中修改此文本。";

    [TextArea(3, 10)]
    public string page02 = "【第02页 - 占位符文本】\n\n这里是第二页的故事内容...\n请在Inspector中修改此文本。";

    [TextArea(3, 10)]
    public string page03 = "【第03页 - 占位符文本】\n\n这里是第三页的故事内容...\n请在Inspector中修改此文本。";

    [TextArea(3, 10)]
    public string page04 = "【第04页 - 占位符文本】\n\n这里是第四页的故事内容...\n请在Inspector中修改此文本。";

    [TextArea(3, 10)]
    public string page05 = "【第05页 - 占位符文本】\n\n这里是第五页的故事内容...\n请在Inspector中修改此文本。";

    [TextArea(3, 10)]
    public string page06 = "【第06页 - 占位符文本】\n\n这里是最后一页的故事内容...\n点击后将进入游戏。";

    [Header("=== 每页背景图（可选） ===")]
    [Tooltip("不设置则保持黑底")]
    public Sprite bg01;
    public Sprite bg02;
    public Sprite bg03;
    public Sprite bg04;
    public Sprite bg05;
    public Sprite bg06;

    [Header("=== 场景设置 ===")]
    [Tooltip("最后一页点击后跳转的场景")]
    public string nextSceneName = "grid";

    [Header("=== 样式设置 ===")]
    public int contentFontSize = 48;
    public int hintFontSize = 24;
    public string hintMessage = "点击继续";

    // 私有变量
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
            contentText.color = Color.white;  // 白色文字
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
        // 检测鼠标点击、空格键或回车键
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

        // 输出当前页面编号（调试用）
        Debug.Log($"显示页面: {(pageIndex + 1):D2}");

        // 设置背景图片（如果有）
        if (backgroundImage != null)
        {
            if (backgroundSprites[pageIndex] != null)
            {
                backgroundImage.sprite = backgroundSprites[pageIndex];
                backgroundImage.color = Color.white;  // 有图片时显示原色
            }
            else
            {
                backgroundImage.sprite = null;
                backgroundImage.color = Color.black;  // 无图片时显示黑色
            }
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

        // 如果是最后一页，加载grid场景
        if (nextIndex >= pageContents.Length)
        {
            LoadNextScene();
            return;
        }

        ShowPage(nextIndex);
    }

    void LoadNextScene()
    {
        Debug.Log("加载场景: " + nextSceneName);
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
