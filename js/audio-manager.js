// ==================== 拼音音频管理器 ====================
class PinyinAudioManager {
    constructor() {
        this.isPlaying = false;
        this.currentAudio = null;
        this.voices = [];
        this.initVoices();
    }
    
    // 初始化语音列表
    initVoices() {
        if ('speechSynthesis' in window) {
            // 等待语音加载
            speechSynthesis.onvoiceschanged = () => {
                this.voices = speechSynthesis.getVoices();
                console.log('可用语音:', this.voices.length);
            };
            // 立即获取一次
            this.voices = speechSynthesis.getVoices();
        }
    }
    
    // 播放拼音
    playPinyin(pinyin) {
        this.stopCurrent();
        
        if (!pinyin) return;
        
        console.log('播放拼音:', pinyin);
        
        // 更新UI状态
        this.updateNowPlaying(pinyin);
        this.highlightPlayingPinyin(pinyin);
        
        // 使用TTS播放
        this.playWithTTS(pinyin);
    }
    
    // 使用TTS播放
    playWithTTS(text) {
        if (!('speechSynthesis' in window)) {
            this.showFallbackAlert(text);
            return;
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.8;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // 选择中文语音
        const chineseVoice = this.voices.find(v => 
            v.lang.includes('zh') || v.lang.includes('CN') || v.name.includes('Chinese')
        );
        if (chineseVoice) {
            utterance.voice = chineseVoice;
        }
        
        // 事件监听
        utterance.onstart = () => {
            this.isPlaying = true;
            document.body.classList.add('speaking');
            console.log('开始发音:', text);
        };
        
        utterance.onend = () => {
            this.isPlaying = false;
            document.body.classList.remove('speaking');
            document.getElementById('nowPlaying').textContent = '播放完成';
            console.log('发音结束');
        };
        
        utterance.onerror = (event) => {
            console.error('发音错误:', event);
            this.isPlaying = false;
            document.body.classList.remove('speaking');
            this.showFallbackAlert(text);
        };
        
        speechSynthesis.speak(utterance);
    }
    
    // 播放声调练习
    playTonePractice() {
        const tones = ['mā', 'má', 'mǎ', 'mà'];
        let index = 0;
        
        const playNext = () => {
            if (index < tones.length) {
                this.playPinyin(tones[index]);
                index++;
                setTimeout(playNext, 2000); // 2秒间隔
            }
        };
        
        playNext();
    }
    
    // 播放所有声母
    playAllShengmu() {
        const shengmu = ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's'];
        let index = 0;
        
        const playNext = () => {
            if (index < shengmu.length) {
                this.playPinyin(shengmu[index]);
                index++;
                setTimeout(playNext, 1500);
            }
        };
        
        playNext();
    }
    
    // 播放常用词
    playWord(word) {
        this.playPinyin(word);
    }
    
    // 停止当前播放
    stopCurrent() {
        if (this.isPlaying) {
            speechSynthesis.cancel();
            this.isPlaying = false;
            document.body.classList.remove('speaking');
        }
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
        }
    }
    
    // 更新播放状态显示
    updateNowPlaying(pinyin) {
        const nowPlaying = document.getElementById('nowPlaying');
        if (nowPlaying) {
            nowPlaying.innerHTML = `<i class="fas fa-volume-up"></i> 正在播放: <strong>${pinyin}</strong>`;
        }
    }
    
    // 高亮正在播放的拼音
    highlightPlayingPinyin(pinyin) {
        // 移除所有高亮
        document.querySelectorAll('.pinyin-btn, .pinyin-with-audio').forEach(el => {
            el.classList.remove('playing');
        });
        
        // 添加新高亮
        document.querySelectorAll('.pinyin-btn, .pinyin-with-audio').forEach(el => {
            if (el.textContent.trim() === pinyin) {
                el.classList.add('playing');
                setTimeout(() => el.classList.remove('playing'), 2000);
            }
        });
    }
    
    // 备用方案：弹窗提示
    showFallbackAlert(text) {
        alert(`📢 拼音: ${text}\n\n如果听不到声音，请检查：\n1. 浏览器音量是否开启\n2. 是否允许网页播放声音\n3. 尝试使用 Chrome 或 Edge 浏览器`);
    }
}

// 创建全局实例
window.audioManager = new PinyinAudioManager();
