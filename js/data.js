// 拼音数据管理器
const PinyinData = {
    // 声母
    initials: ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'zh', 'ch', 'sh', 'r', 'z', 'c', 's', 'y', 'w'],
    
    // 韵母
    finals: ['a', 'o', 'e', 'i', 'u', 'v', 'ai', 'ei', 'ui', 'ao', 'ou', 'iu', 'ie', 've', 'er', 'an', 'en', 'in', 'un', 'vn', 'ang', 'eng', 'ing', 'ong'],
    
    // 声调
    tones: ['ā', 'á', 'ǎ', 'à', 'ō', 'ó', 'ǒ', 'ò', 'ē', 'é', 'ě', 'è', 'ī', 'í', 'ǐ', 'ì', 'ū', 'ú', 'ǔ', 'ù', 'ǖ', 'ǘ', 'ǚ', 'ǜ'],
    
    // 拼音到汉字的映射
    pinyinToCharacters: {
        'bàba': ['爸爸'],
        'māma': ['妈妈'],
        'gēge': ['哥哥'],
        'mèimei': ['妹妹'],
        'dìdi': ['弟弟'],
        'jiějie': ['姐姐'],
        'nǎinai': ['奶奶'],
        'yéye': ['爷爷'],
        'lǎoshī': ['老师'],
        'xuéshēng': ['学生'],
        'shūbāo': ['书包'],
        'qiānbǐ': ['铅笔'],
        'zhuōzi': ['桌子'],
        'yǐzi': ['椅子'],
        'chuānghu': ['窗户'],
        'méihuā': ['梅花'],
        'zhúzi': ['竹子'],
        'sōngshǔ': ['松鼠'],
        'xiǎoniǎo': ['小鸟'],
        'huāduǒ': ['花朵']
    },
    
    // 课程数据
    lessons: [
        {
            id: 1,
            title: '基础声母',
            description: '学习 b, p, m, f 等基本声母',
            pinyinList: ['bā', 'pá', 'mǎ', 'fà', 'dé', 'tè', 'nǎ', 'lè']
        },
        {
            id: 2,
            title: '简单韵母',
            description: '学习 a, o, e, i, u, v 等韵母',
            pinyinList: ['ā', 'ó', 'ě', 'ì', 'ù', 'ǚ', 'mā', 'bō']
        },
        {
            id: 3,
            title: '家庭称呼',
            description: '学习家庭成员称呼',
            pinyinList: ['bàba', 'māma', 'gēge', 'mèimei', 'yéye', 'nǎinai']
        },
        {
            id: 4,
            title: '学校用品',
            description: '学习学校相关词汇',
            pinyinList: ['shūbāo', 'qiānbǐ', 'zhuōzi', 'yǐzi', 'lǎoshī', 'xuéshēng']
        }
    ],
    
    // 获取随机拼音
    getRandomPinyin: function() {
        const pinyinList = Object.keys(this.pinyinToCharacters);
        const randomIndex = Math.floor(Math.random() * pinyinList.length);
        return pinyinList[randomIndex];
    },
    
    // 获取拼音的汉字选项
    getCharacterOptions: function(pinyin, count = 4) {
        const correctChar = this.pinyinToCharacters[pinyin][0];
        const allChars = Object.values(this.pinyinToCharacters).flat();
        const wrongChars = allChars.filter(char => char !== correctChar);
        
        // 随机选择错误选项
        const shuffledWrong = wrongChars.sort(() => 0.5 - Math.random()).slice(0, count - 1);
        
        // 合并选项并随机排序
        const options = [correctChar, ...shuffledWrong];
        return options.sort(() => 0.5 - Math.random());
    },
    
    // 获取课程数据
    getLessonData: function(lessonId) {
        return this.lessons.find(lesson => lesson.id === lessonId);
    }
};

// 导出为全局变量
if (typeof window !== 'undefined') {
    window.PinyinData = PinyinData;
}
