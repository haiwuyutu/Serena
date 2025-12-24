// 音频管理器
const audioManager = {
    playPinyin(pinyin) {
        console.log('播放拼音:', pinyin);
        
        // 优先使用TTS
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(pinyin);
            utterance.lang = 'zh-CN';
            utterance.rate = 0.8;
            
            // 添加事件
            utterance.onstart = () => {
                document.getElementById('nowPlaying').textContent = `正在播放: ${pinyin}`;
            };
            
            utterance.onend = () => {
                document.getElementById('nowPlaying').textContent = '播放完成';
            };
            
            speechSynthesis.speak(utterance);
        } else {
            // 备用：使用音频文件
            const audioMap = {
                'a': 'https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3',
                'b': 'https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3',
                // 这里可以替换为真实拼音音频
            };
            
            if (audioMap[pinyin]) {
                new Audio(audioMap[pinyin]).play();
            } else {
                alert('点击听到：' + pinyin);
            }
        }
    },
    
    playTonePractice() {
        const tones = ['mā', 'má', 'mǎ', 'mà'];
        tones.forEach((tone, i) => {
            setTimeout(() => this.playPinyin(tone), i * 1500);
        });
    }
};
