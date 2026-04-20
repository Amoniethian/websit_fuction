using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

/// <summary>
/// Start场景的UI管理器
/// 用于SampleScene场景
/// </summary>
public class StartSceneUI : MonoBehaviour
{
    [Header("UI Elements")]
    public Image backgroundImage;  // 背景图片，可在Inspector中更换Sprite
    public Button startButton;     // 开始游戏按钮

    [Header("Scene Settings")]
    public string nextSceneName = "beginning";  // 点击开始后跳转的场景

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
        Debug.Log("开始游戏! 加载场景: " + nextSceneName);
        SceneManager.LoadScene(nextSceneName);
    }

    /// <summary>
    /// 通过代码更换背景图片
    /// </summary>
    public void SetBackgroundSprite(Sprite newSprite)
    {
        if (backgroundImage != null)
        {
            backgroundImage.sprite = newSprite;
        }
    }
}
