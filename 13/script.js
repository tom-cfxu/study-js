//获取节点
const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

//data 存储成语
let data = [
    {
        image: "./img/spring01.jpg",
        text: "春暖花开"
    },
    {
        image: "./img/summer01.jpg",
        text: "夏阳酷暑"
    },
    {
        image: "./img/autumn01.jpg",
        text: "雁过留声"
    },
    {
        image: "./img/winter01.jpg",
        text: "白雪皑皑"
    },
    {
        image: "./img/spring02.jpg",
        text: "草长莺飞"
    },
    {
        image: "./img/summer02.jpg",
        text: "骄阳似火"
    },
    {
        image: "./img/autumn02.jpg",
        text: "一叶知秋 "
    },
    {
        image: "./img/winter02.jpg",
        text: "瑞雪纷飞"
    },
    {
        image: "./img/spring03.jpg",
        text: "鸟语花香"
    },
    {
        image: "./img/summer03.jpg",
        text: "艳阳高照"
    },
    {
        image: "./img/autumn03.jpg",
        text: "秋风瑟瑟"
    },
    {
        image: "./img/winter03.jpg",
        text: "雪中送炭"
    }
];

data.forEach(createBox);

//创建createBox
function createBox(item) {
    // console.log(item)
    const box = document.createElement('div');
    const { image, text } = item;

    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt="${text}" >
        <p class="info">${text}</p>
    `;
    //点击按钮进行阅读
    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        //添加active阴影
        box.classList.add('active');
        setTimeout(() => {
            box.classList.remove('active')
        }, 1500)
    })
    main.appendChild(box);
}
// 初始化speechSynthesis对象
const message = new SpeechSynthesisUtterance();
//创建空数组储存语音列表
let voices = [];
function getVoices() {
    voices = speechSynthesis.getVoices();
    // console.log(voices)
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name}${voice.lang}`
        voicesSelect.appendChild(option);
    })
}
//setTextMessage 获取文字
function setTextMessage(text) {
    message.text = text;
}
//阅读文字
function speakText() {
    speechSynthesis.speak(message);
}
// setVoice
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value)
}
//切换语音事件监听
speechSynthesis.addEventListener('voiceschanged', getVoices);
//切换文字框事件监听
toggleBtn.addEventListener('click', () => {
    document.getElementById('text-box').classList.toggle('show')
})

//关闭文字框事件
closeBtn.addEventListener('click', () => {
    document.getElementById('text-box').classList.remove('show')
})

//select 下拉框事件监听
voicesSelect.addEventListener('change', setVoice)
getVoices();

//阅读文字按钮的事件监听
read.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
})