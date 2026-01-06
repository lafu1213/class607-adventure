// ==========================================
//  1. 設定區 (⚠️ 這裡記得換回您的 Google 網址！)
// ==========================================
// 請把雙引號中間換成您在 Apps Script 部署拿到的那串網址
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxy2_inueBSmZpQsuUQ32DYe3VnCuDqr3B9mba0wVHISTm4fP-4sztmslYaP35eyRnUwA/exec"; 

// ==========================================
//  2. 題庫區 (Data Layer)
// ==========================================
const questionBank = {
    chinese: [
        { q: "愛爾蘭作家王爾德曾說過哪一句話，用來比喻探索人生意義的鑰匙？", options: ["生活的奧祕存在於藝術之中", "藝術是生活的唯一導師", "讀萬卷書不如行萬里路", "想像力比知識更重要"], ans: 0 }, 
        { q: "根據來源，王爾德為他的兩個兒子寫了哪一本著名的故事集？", options: ["巨人的花園", "快樂王子和其他故事集", "森林王子", "星星之子"], ans: 1 }, 
        { q: "第七課《跟著公共藝術去旅行》的作者是誰？", options: ["楊英風", "馬君輔", "張育雯", "朱銘"], ans: 2 }, 
        { q: "公共藝術（Public Art）必須具備哪兩項特點？", options: ["實用性與美觀性", "公共性與藝術性", "歷史性與教育性", "趣味性與互動性"], ans: 1 }, 
        { q: "主角跟家人開始這趟「公共藝術之旅」的主要原因是什麼？", options: ["因為學校作業的要求", "因為看完畫展想去散心", "因為聽完阿姨分享後對公共藝術感到好奇", "因為想去美術館吹冷氣"], ans: 2 }, 
        { q: "作品《大地之書》是將什麼東西的細部紋理封存在青銅雕塑裡？", options: ["昆蟲的翅膀", "臺灣原生植物的葉子、種子和花朵", "歷代名家的書法拓本", "海邊的貝殼與沙礫"], ans: 1 }, 
        { q: "在嘉義觸口遊客中心看到的《花間小鹿》，其鹿角呈現什麼樣的外觀？", options: ["像珊瑚般的分叉", "像樹枝般昂揚", "像金屬片的堆疊", "像花苞般含放"], ans: 1 }, 
        { q: "《花間小鹿》這件作品想要傳遞哪一個原住民族的獵鹿傳說？", options: ["泰雅族", "阿美族", "鄒族", "排灣族"], ans: 2 }, 
        { q: "根據「文化藝術獎助及促進條例」，重大公共工程應設置公共藝術，其經費不得少於工程造價的多少？", options: ["百分之五", "百分之一", "百分之十", "百分之三"], ans: 1 }, 
        { q: "作品《分合隨緣》是哪一位藝術家的創作？", options: ["笠原由起子", "楊英風", "朱銘", "賴亭玟"], ans: 1 }, 
        { q: "關於作品《分合隨緣》的特色，下列敘述何者正確？", options: ["是一件木雕作品", "影像會隨著觀賞角度的不同而產生變化", "作品目前設置在臺北市立美術館", "是一件噴漆彩繪作品"], ans: 1 }, 
        { q: "作者提到美術館內的參觀禮儀，爸爸特別叮囑主角要如何？", options: ["踴躍發問", "輕聲細語", "盡情拍照", "快速通過"], ans: 1 }, 
        { q: "下列哪一個詞語可以用來形容「五彩繽紛、繁華美麗」的樣子？", options: ["雕蟲小技", "略知皮毛", "花團錦簇", "衣錦還鄉"], ans: 2 }, 
        { q: "「一□眼，古物藝術品已經流傳千年之久。」空格中應填入哪個字？", options: ["炸", "眨", "眨", "貶"], ans: 1 }, 
        { q: "「為了研究石碑上的文字，老師帶著學生進行□印。」空格中應填入哪個字？", options: ["拓", "踏", "托", "拓"], ans: 0 }, 
        { q: "文中提到現代藝術的特色大約出現在二十世紀，其主要的特色為何？", options: ["寫實、工整", "抽象、幻想", "傳統、嚴謹", "鮮豔、華麗"], ans: 1 }, 
        { q: "在閱讀測驗中，作者提到楊英風有一位非常出名的學生是誰？", options: ["吳寬瀛", "馬可‧卡薩格蘭", "朱銘", "張育雯"], ans: 2 }, 
        { q: "朱銘美術館中，作者提到他最喜歡哪一個系列的創作？", options: ["大地系列", "太極系列", "人間系列", "森林系列"], ans: 1 }, 
        { q: "下列句型運用，何者屬於「假設複句」？", options: ["一方面可以欣賞藝術，另一方面可以增長見聞。", "只要有心，就能成功。", "若想擁有健康的身體，就必須多運動。", "他一邊唱歌，一邊跳舞。"], ans: 2 }, 
        { q: "「形容忽然完全明白」可以用哪一個成語？", options: ["恍然大悟", "銅牆鐵壁", "竭澤而漁", "含苞待放"], ans: 0 }
    ],
    math: [],
    nature: [],
    social: [],
    english: [],
    eng1200: [],
    tang: [],
    lang_king: [],
    geo_king: []
};

// ==========================================
//  3. 遊戲邏輯核心 (Logic Layer)
// ==========================================

let studentInfo = { className: "", seatNo: "" };
let currentSubject = '';
let currentQuestionIndex = 0;
let score = 0;

// --- 登入功能 (修正回來了！) ---
function login() {
    const classVal = document.getElementById('class-select').value;
    const seatVal = document.getElementById('seat-select').value;
    
    // 檢查是否選擇
    if (!classVal || !seatVal) {
        alert("請確認班級和座號都有選擇喔！");
        return;
    }
    
    studentInfo.className = classVal;
    studentInfo.seatNo = seatVal;

    // 畫面切換：隱藏登入，顯示選單
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('menu-screen').classList.remove('hidden');
}

// --- 啟動遊戲 ---
function startGame(subject) {
    currentSubject = subject;
    currentQuestionIndex = 0;
    score = 0;
    
    // 檢查該科目是否有題目
    if (!questionBank[subject] || questionBank[subject].length === 0) {
        alert("🚧 老師還在努力出題中，請稍後再來！");
        return;
    }

    document.getElementById('menu-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    document.getElementById('subject-title').innerText = getSubjectName(subject);
    document.getElementById('score').innerText = score;
    
    loadQuestion();
}

// --- 載入題目 ---
function loadQuestion() {
    const data = questionBank[currentSubject][currentQuestionIndex];
    document.getElementById('question-text').innerText = `Q${currentQuestionIndex + 1}: ${data.q}`;
    
    const optionsDiv = document.getElementById('options-container');
    optionsDiv.innerHTML = ''; // 清空舊選項
    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('next-btn').classList.add('hidden');

    // 產生選項按鈕
    data.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index, btn);
        optionsDiv.appendChild(btn);
    });
}

// --- 檢查答案 ---
function checkAnswer(selectedIndex, btnElement) {
    const data = questionBank[currentSubject][currentQuestionIndex];
    const correctIndex = data.ans;
    const feedbackBox = document.getElementById('feedback');

    // 鎖定所有按鈕不能再按
    const allBtns = document.querySelectorAll('#options-container button');
    allBtns.forEach(btn => btn.disabled = true);

    if (selectedIndex === correctIndex) {
        btnElement.classList.add('correct');
        feedbackBox.innerText = "🎉 答對了！太強了吧！";
        feedbackBox.className = "feedback-box correct"; 
        score += 10;
    } else {
        btnElement.classList.add('wrong');
        allBtns[correctIndex].classList.add('correct'); // 顯示正確答案
        feedbackBox.innerText = "😅 哎呀！正確答案是: " + data.options[correctIndex];
        feedbackBox.className = "feedback-box wrong";
    }
    
    document.getElementById('score').innerText = score;
    feedbackBox.classList.remove('hidden');
    document.getElementById('next-btn').classList.remove('hidden');
}

// --- 下一題 (包含結束時傳送成績) ---
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionBank[currentSubject].length) {
        loadQuestion();
    } else {
        // 題目做完，傳送成績
        sendScoreToGoogleSheet();
    }
}

// --- 傳送成績到 Google Sheet ---
function sendScoreToGoogleSheet() {
    alert(`🏆 恭喜完成！你的得分是：${score} 分\n正在上傳成績...`);

    const data = {
        className: studentInfo.className,
        seatNo: studentInfo.seatNo,
        subject: getSubjectName(currentSubject),
        score: score
    };

    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' }
    }).then(() => {
        alert("✅ 成績已成功傳送給烈甫老師！");
        showMenu();
    }).catch(err => {
        alert("❌ 傳送失敗，請截圖給老師看：" + err);
        showMenu();
    });
}

// --- 返回主選單 ---
function showMenu() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('menu-screen').classList.remove('hidden');
}

// --- 輔助：取得中文科目名稱 ---
function getSubjectName(key) {
    const map = {
        chinese: '國語', math: '數學', nature: '自然', social: '社會',
        english: '英語', eng1200: '英語1200', tang: '唐詩', 
        lang_king: '語文知識王', geo_king: '地理王'
    };
    return map[key] || key;
}