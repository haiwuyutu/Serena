// 拼音游戏引擎
class PinyinGameEngine {
    constructor() {
        this.score = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.currentLevel = 1;
        this.currentQuestion = null;
        this.gameActive = false;
        this.timer = 60;
        this.timerInterval = null;
    }
    
    // 开始新游戏
    startGame() {
        this.resetGame();
        this.gameActive = true;
        this.generateQuestion();
        this.startTimer();
        return this.currentQuestion;
    }
    
    // 重置游戏
    resetGame() {
        this.score = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.combo = 0;
        this.maxCombo = 0;
        this.currentLevel = 1;
        this.timer = 60;
        this.gameActive = false;
        
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    // 生成新问题
    generateQuestion() {
        const pinyin = PinyinData.getRandomPinyin();
        const characters = PinyinData.getCharacterOptions(pinyin);
        const correctAnswer = PinyinData.pinyinToCharacters[pinyin][0];
        
        this.currentQuestion = {
            pinyin: pinyin,
            characters: characters,
            correctAnswer: correctAnswer,
            userAnswer: null,
            answered: false
        };
        
        return this.currentQuestion;
    }
    
    // 提交答案
    submitAnswer(selectedCharacter) {
        if (!this.currentQuestion || this.currentQuestion.answered) {
            return { valid: false };
        }
        
        this.currentQuestion.userAnswer = selectedCharacter;
        this.currentQuestion.answered = true;
        
        const isCorrect = selectedCharacter === this.currentQuestion.correctAnswer;
        
        if (isCorrect) {
            this.handleCorrectAnswer();
        } else {
            this.handleWrongAnswer();
        }
        
        return {
            valid: true,
            correct: isCorrect,
            correctAnswer: this.currentQuestion.correctAnswer,
            score: this.score,
            combo: this.combo,
            maxCombo: this.maxCombo
        };
    }
    
    // 处理正确答案
    handleCorrectAnswer() {
        this.correctAnswers++;
        this.combo++;
        
        if (this.combo > this.maxCombo) {
            this.maxCombo = this.combo;
        }
        
        // 基础分数 + 连击奖励
        let points = 10;
        if (this.combo >= 5) points += 5;
        if (this.combo >= 10) points += 10;
        
        this.score += points;
        
        // 每答对5题升一级
        if (this.correctAnswers % 5 === 0) {
            this.currentLevel++;
        }
    }
    
    // 处理错误答案
    handleWrongAnswer() {
        this.wrongAnswers++;
        this.combo = 0;
    }
    
    // 开始计时器
    startTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        this.timerInterval = setInterval(() => {
            if (this.timer > 0) {
                this.timer--;
            } else {
                this.endGame();
            }
        }, 1000);
    }
    
    // 结束游戏
    endGame() {
        this.gameActive = false;
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    // 获取游戏统计
    getStats() {
        return {
            score: this.score,
            correct: this.correctAnswers,
            wrong: this.wrongAnswers,
            combo: this.combo,
            maxCombo: this.maxCombo,
            level: this.currentLevel,
            timeLeft: this.timer,
            totalQuestions: this.correctAnswers + this.wrongAnswers,
            accuracy: this.correctAnswers + this.wrongAnswers > 0 
                ? Math.round((this.correctAnswers / (this.correctAnswers + this.wrongAnswers)) * 100) 
                : 0
        };
    }
    
    // 暂停/恢复游戏
    togglePause() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        } else if (this.gameActive) {
            this.startTimer();
        }
        
        return this.timerInterval !== null;
    }
}

// 导出为全局变量
if (typeof window !== 'undefined') {
    window.PinyinGameEngine = PinyinGameEngine;
    window.gameEngine = new PinyinGameEngine();
}
