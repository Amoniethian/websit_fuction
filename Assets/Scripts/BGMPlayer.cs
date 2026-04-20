using UnityEngine;

/// <summary>
/// BGM播放器 - 跨场景持续播放背景音乐
/// 使用单例模式，切换场景时不会销毁
/// </summary>
public class BGMPlayer : MonoBehaviour
{
    public static BGMPlayer Instance { get; private set; }

    [Header("BGM Settings")]
    public AudioClip bgmClip;           // BGM音频文件
    [Range(0f, 1f)]
    public float volume = 0.5f;         // 音量
    public bool playOnAwake = true;     // 启动时自动播放
    public bool loop = true;            // 循环播放

    private AudioSource audioSource;

    void Awake()
    {
        // 单例模式：确保只有一个BGM播放器实例
        if (Instance == null)
        {
            Instance = this;
            DontDestroyOnLoad(gameObject);  // 切换场景时不销毁
            SetupAudioSource();
        }
        else
        {
            Destroy(gameObject);  // 销毁重复的实例
        }
    }

    void SetupAudioSource()
    {
        audioSource = gameObject.AddComponent<AudioSource>();
        audioSource.clip = bgmClip;
        audioSource.volume = volume;
        audioSource.loop = loop;
        audioSource.playOnAwake = false;

        if (playOnAwake && bgmClip != null)
        {
            audioSource.Play();
        }
    }

    /// <summary>
    /// 播放BGM
    /// </summary>
    public void Play()
    {
        if (audioSource != null && !audioSource.isPlaying)
        {
            audioSource.Play();
        }
    }

    /// <summary>
    /// 暂停BGM
    /// </summary>
    public void Pause()
    {
        if (audioSource != null)
        {
            audioSource.Pause();
        }
    }

    /// <summary>
    /// 停止BGM
    /// </summary>
    public void Stop()
    {
        if (audioSource != null)
        {
            audioSource.Stop();
        }
    }

    /// <summary>
    /// 设置音量
    /// </summary>
    public void SetVolume(float newVolume)
    {
        volume = Mathf.Clamp01(newVolume);
        if (audioSource != null)
        {
            audioSource.volume = volume;
        }
    }

    /// <summary>
    /// 切换BGM
    /// </summary>
    public void ChangeBGM(AudioClip newClip)
    {
        if (audioSource != null && newClip != null)
        {
            audioSource.Stop();
            audioSource.clip = newClip;
            bgmClip = newClip;
            audioSource.Play();
        }
    }
}
