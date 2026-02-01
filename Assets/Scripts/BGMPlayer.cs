using UnityEngine;

/// <summary>
/// BGM播放器 - 跨场景持续播放背景音乐
/// </summary>
public class BGMPlayer : MonoBehaviour
{
    public static BGMPlayer Instance { get; private set; }

    [Header("Audio Settings")]
    public AudioClip bgmClip;
    [Range(0f, 1f)]
    public float volume = 0.5f;
    public bool playOnAwake = true;
    public bool loop = true;

    private AudioSource audioSource;

    void Awake()
    {
        // 单例模式，确保只有一个BGM播放器
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }

        Instance = this;
        DontDestroyOnLoad(gameObject);

        // 设置音频源
        audioSource = GetComponent<AudioSource>();
        if (audioSource == null)
        {
            audioSource = gameObject.AddComponent<AudioSource>();
        }

        audioSource.clip = bgmClip;
        audioSource.volume = volume;
        audioSource.loop = loop;
        audioSource.playOnAwake = false;

        if (playOnAwake && bgmClip != null)
        {
            Play();
        }
    }

    public void Play()
    {
        if (audioSource != null && !audioSource.isPlaying)
        {
            audioSource.Play();
        }
    }

    public void Stop()
    {
        if (audioSource != null)
        {
            audioSource.Stop();
        }
    }

    public void Pause()
    {
        if (audioSource != null)
        {
            audioSource.Pause();
        }
    }

    public void SetVolume(float newVolume)
    {
        volume = Mathf.Clamp01(newVolume);
        if (audioSource != null)
        {
            audioSource.volume = volume;
        }
    }

    public void SetBGM(AudioClip newClip)
    {
        if (audioSource != null)
        {
            bool wasPlaying = audioSource.isPlaying;
            audioSource.Stop();
            audioSource.clip = newClip;
            bgmClip = newClip;
            if (wasPlaying)
            {
                audioSource.Play();
            }
        }
    }
}
