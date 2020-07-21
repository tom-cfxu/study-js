//获取节点
const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-botton");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMsg = document.getElementById("final-msg");

const figureParts = document.querySelectorAll(".figure-part");

const words = ['application', 'abandom', 'programming', 'interface', 'wonder'];

let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = [];

//显示单词函数
function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord
            .split("")
            .map(
                letter => `<span class="letter"> 
                ${correctLetters.includes(letter) ? letter : ""}
                </span>
                `
            ).join("")
        }
    `;
    const innerWord = wordEl.innerText.replace(/\n/g, "")
    if (innerWord === selectedWord) {
        finalMsg.innerText = '恭喜你输入正确!'
        popup.style.display = "flex";
    }
}

//提示已存在该字母
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 1000)
}

//提示错误
function updateWrongLettersEl() {
    //显示错误字母
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>错误</p>" : ""}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `
    //显示火柴人
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if (index < errors) {
            part.style.display = "block";
        } else {
            part.style.display = "none";
        }
    })
    //机会用尽
    if (wrongLetters.length === figureParts.length) {
        finalMsg.innerText = "抱歉输入错误,游戏结束";
        popup.style.display = "flex";
    }
}
//事件监听
window.addEventListener('keydown', e => {
    // console.log(e.keyCode)
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        // console.log(e.keyCode)
        const letter = e.key;
        // console.log(letter);
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersEl();
            }
        }
    }
})
//再玩一次
playAgainBtn.addEventListener("click", () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLettersEl();
    popup.style.display = "none";
})
displayWord();