using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

/// <summary>
/// Start场景的UI管理器
/// </summary>
public class StartSceneUI : MonoBehaviour
{
    [Header("UI Elements")]
    public Image backgroundImage;  // 背景图片，可在Inspector中更换
    public Button startButton;     // 开始游戏按钮

    [Header("Scene Settings")]
    public string nextSceneName = "beginning";  // 下一个场景名称

    void Start()
    {
        // 绑定开始按钮点击事件
        if (startButton != null)
        {
            startButton.onClick.AddListener(OnStartButtonClicked);
        }
    }

    void OnStartButtonClicked()
    {
        Debug.Log("Start button clicked, loading scene: " + nextSceneName);
        SceneManager.LoadScene(nextSceneName);
    }

    // 公开方法，可以通过代码更换背景
    public void SetBackgroundSprite(Sprite newSprite)
    {
        if (backgroundImage != null)
        {
            backgroundImage.sprite = newSprite;
        }
    }
}
