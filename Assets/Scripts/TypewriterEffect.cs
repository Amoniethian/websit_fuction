using UnityEngine;
using UnityEngine.UI;
using System.Collections;
using TMPro;

/// <summary>
/// 打字机效果组件
/// </summary>
public class TypewriterEffect : MonoBehaviour
{
    [Header("Settings")]
    public float characterDelay = 0.05f;  // 每个字符的延迟时间
    public bool useTextMeshPro = true;    // 是否使用TextMeshPro

    [Header("Audio (Optional)")]
    public AudioClip typeSound;           // 打字音效（可选）
    public AudioSource audioSource;

    private Text uiText;
    private TextMeshProUGUI tmpText;
    private string fullText;
    private Coroutine typingCoroutine;
    private bool isTyping = false;

    public bool IsTyping => isTyping;

    void Awake()
    {
        if (useTextMeshPro)
        {
            tmpText = GetComponent<TextMeshProUGUI>();
        }
        else
        {
            uiText = GetComponent<Text>();
        }
    }

    /// <summary>
    /// 开始打字效果
    /// </summary>
    public void StartTyping(string text)
    {
        fullText = text;

        if (typingCoroutine != null)
        {
            StopCoroutine(typingCoroutine);
        }

        typingCoroutine = StartCoroutine(TypeText());
    }

    /// <summary>
    /// 立即显示全部文字
    /// </summary>
    public void ShowFullText()
    {
        if (typingCoroutine != null)
        {
            StopCoroutine(typingCoroutine);
        }

        if (useTextMeshPro && tmpText != null)
        {
            tmpText.text = fullText;
        }
        else if (uiText != null)
        {
            uiText.text = fullText;
        }

        isTyping = false;
    }

    /// <summary>
    /// 清空文字
    /// </summary>
    public void ClearText()
    {
        if (typingCoroutine != null)
        {
            StopCoroutine(typingCoroutine);
        }

        if (useTextMeshPro && tmpText != null)
        {
            tmpText.text = "";
        }
        else if (uiText != null)
        {
            uiText.text = "";
        }

        isTyping = false;
    }

    private IEnumerator TypeText()
    {
        isTyping = true;

        if (useTextMeshPro && tmpText != null)
        {
            tmpText.text = "";
        }
        else if (uiText != null)
        {
            uiText.text = "";
        }

        foreach (char c in fullText)
        {
            if (useTextMeshPro && tmpText != null)
            {
                tmpText.text += c;
            }
            else if (uiText != null)
            {
                uiText.text += c;
            }

            // 播放打字音效
            if (typeSound != null && audioSource != null && c != ' ')
            {
                audioSource.PlayOneShot(typeSound);
            }

            yield return new WaitForSeconds(characterDelay);
        }

        isTyping = false;
    }
}
