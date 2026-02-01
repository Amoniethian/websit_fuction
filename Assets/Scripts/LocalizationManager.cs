using System;
using UnityEngine;

/// <summary>
/// 本地化管理器 - 管理当前语言设置
/// </summary>
public static class LocalizationManager
{
    private static SystemLanguage _currentLanguage = SystemLanguage.ChineseSimplified;

    /// <summary>
    /// 当前语言
    /// </summary>
    public static SystemLanguage CurrentLanguage
    {
        get => _currentLanguage;
        set
        {
            if (_currentLanguage != value)
            {
                _currentLanguage = value;
                OnLanguageChanged?.Invoke(value);
                SaveLanguagePreference();
            }
        }
    }

    /// <summary>
    /// 语言变更事件
    /// </summary>
    public static event Action<SystemLanguage> OnLanguageChanged;

    /// <summary>
    /// 初始化（在游戏启动时调用）
    /// </summary>
    [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
    private static void Initialize()
    {
        LoadLanguagePreference();
    }

    /// <summary>
    /// 设置为中文
    /// </summary>
    public static void SetChinese() => CurrentLanguage = SystemLanguage.ChineseSimplified;

    /// <summary>
    /// 设置为英文
    /// </summary>
    public static void SetEnglish() => CurrentLanguage = SystemLanguage.English;

    /// <summary>
    /// 切换语言
    /// </summary>
    public static void ToggleLanguage()
    {
        CurrentLanguage = CurrentLanguage == SystemLanguage.English
            ? SystemLanguage.ChineseSimplified
            : SystemLanguage.English;
    }

    /// <summary>
    /// 根据系统语言自动选择
    /// </summary>
    public static void UseSystemLanguage()
    {
        var sysLang = Application.systemLanguage;

        CurrentLanguage = sysLang switch
        {
            SystemLanguage.Chinese => SystemLanguage.ChineseSimplified,
            SystemLanguage.ChineseSimplified => SystemLanguage.ChineseSimplified,
            SystemLanguage.ChineseTraditional => SystemLanguage.ChineseSimplified,
            _ => SystemLanguage.English
        };
    }

    private static void SaveLanguagePreference()
    {
        PlayerPrefs.SetString("Language", _currentLanguage.ToString());
        PlayerPrefs.Save();
    }

    private static void LoadLanguagePreference()
    {
        if (PlayerPrefs.HasKey("Language"))
        {
            string saved = PlayerPrefs.GetString("Language");
            if (Enum.TryParse<SystemLanguage>(saved, out var lang))
            {
                _currentLanguage = lang;
                return;
            }
        }

        // 首次运行，使用系统语言
        UseSystemLanguage();
    }
}
