//获取节点
function $(id) {
    return document.getElementById(id);
}
const word = $('word'),
    text = $('text'),
    scoreEl = $('score'),
    timeEl = $('time'),
    gameOverEl = $('gameover-container'),
    settingsBtn = $('settings-btn'),
    settings = $('settings'),
    settingsForm = $('settings-form'),
    difficultySelect = $('difficulty');
const words = [
    "sigh",
    "tense",
    "airplane",
    "ball",
    "pies",
    "juice",
    "warlike",
    "bad",
    "north",
    "dependent",
    "steer",
    "silver",
    "highfalutin",
    "superficial",
    "quince",
    "eight",
    "feeble",
    "admit",
    "drag",
    "loving"
]
//初始单词(随机)
let randomWord;

//初始得分
let score = 0;

//初始时间
let time = 10;

//难度选择
let difficulty;
//设置随机产生单词
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)]
}
// console.log(getRandomWord())
//更新单词到DOM节点
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}
//更新倒计时
const timeInterval = setInterval(updateTime, 1000);
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';
    if (time == 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}
//提示游戏结束
function gameOver() {
    gameOverEl.innerHTML = `
    <h1>游戏结束</h1>
    <p>您的最终得分为${score}</p>
    <button onclick="location.reload()">再玩一次</button>
    `
    gameOverEl.style.display = "flex";
}
//更新得分
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}
addWordToDOM();
//聚焦到text输入框
text.focus();
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    // console.log(insertedText)
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();
        //清空输入框
        e.target.value = "";
        time += 5;
        updateTime();
    }
})

//设置按钮事件监听
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide')
})
//下拉框事件监听
settingsForm.addEventListener('change', (e) => {
    difficulty = e.target.value;
    console.log(difficulty)
})