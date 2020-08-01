//获取节点
function $(id) {
    return document.getElementById(id);
}
const cardContainer = $('card-container'),
    prevBtn = $('prev'),
    nextBtn = $('next'),
    currentEl = $('current'),
    showBtn = $('show'),
    hideBtn = $('hide'),
    editHideBtn = $('edit-hide'),
    questionEl = $('question'),
    editQuestionEl = $('edit-question'),
    answerEl = $('answer'),
    editAnswerEl = $('edit-answer'),
    addCardBtn = $('add-card'),
    editCardBtn = $('edit-card'),
    clearBtn = $('clear'),
    jokeBtn = $('joke'),
    addContainer = $('add-container'),
    editContainer = $('edit-container');
//当前卡片下标,便于追踪卡片
let currentActiveCard = getCurrentPage();
//创建空数组储存cardDOM对象
const cardsEl = [];

//创建变量存储card里面的数据
const cardsData = getCardsData();
// const cardsData = [
//     {
//         question: '1-1=?',
//         answer: '2'
//     },
//     {
//         question: '1-1=?',
//         answer: '2'
//     },
//     {
//         question: '1-1=?',
//         answer: '2'
//     },
// ];
// 通过本地存储获取当前页
function getCurrentPage() {
    const currentPage = JSON.parse(localStorage.getItem('currentPage'))
    return currentPage === null ? 0 : currentPage;
};

// 通过本地存储获取数据
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'))
    return cards === null ? [] : cards;
}
// 进行本地存储数据
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    localStorage.setItem('currentPage', JSON.stringify(currentActiveCard));
    window.location.reload();
}
// 进行本地存储当前页
function setCurrentPage() {
    localStorage.setItem('currentPage', JSON.stringify(currentActiveCard));
}
//创建cards获取数据
function createCards() {
    cardsData.forEach((data, index) =>
        createCard(data, index)
    )
}
//显示当前页码
function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`
}
//创建单个card到DOM节点中
function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    if (index == currentActiveCard) {
        card.classList.add('active')
    }
    card.innerHTML = `
    <button onclick="editClick(${index})" class="btn btn-small edit">编辑</button>
    <button onclick="deleteClick(${index})" class="btn btn-small delete">删除</button>
        <div class="inner-card">
            <div class="inner-card-front">
                <p>${data.question}</p>
            </div>
            <div class="inner-card-back">
                <p>${data.answer}</p>
            </div>
        </div>
    `;
    card.addEventListener('click', () => {
        card.classList.toggle('show-answer')
    })
    cardsEl.push(card);
    cardContainer.appendChild(card);
    updateCurrentText();
}
createCards();
//拼接字符串
function getKey(obj) {
    var arr = []
    var str = ''
    for (const key in obj) {
        arr.push(key + "=" + obj[key])
    }
    return str = arr.join('&')
}
//获取笑话
async function getJoke() {
    const pagenum = Math.floor(Math.random() * 100);
    const pagesize = 5;
    const body = {
        appkey: '64d58dbe7a9da62d',
        pagenum,
        pagesize
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: 'follow',
        // mode: 'no-cors',
        body: getKey(body)
    };
    const res = await fetch(`https://cors-anywhere.herokuapp.com/https://api.jisuapi.com/jzw/search`, requestOptions);

    const data = await res.json();
    data.result.list.forEach(data => {
        const card = {
            question: data.content,
            answer: data.answer
        }
        createCard(card);
        cardsData.push(card);
        setCardsData(cardsData)
    })
    // console.log(data)
}
//事件监听
//随机获取笑话
jokeBtn.addEventListener('click', getJoke)
//点击编辑页按钮
function editClick(index) {
    window.event.stopPropagation();
    editContainer.classList.add('show');
    updataEditForm(cardsData[index])
}
//更新编辑页内容
function updataEditForm(form) {
    const { question, answer } = form;
    editQuestionEl.value = question;
    editAnswerEl.value = answer;
}
//修改卡片按钮
editCardBtn.addEventListener('click', () => {
    const question = editQuestionEl.value;
    const answer = editAnswerEl.value;
    if (question.trim() && answer.trim()) {
        cardsData[currentActiveCard] = { question, answer }
        // console.log(cardsData)
        editContainer.classList.remove('show')
        setCardsData(cardsData)
    }
})
//删除单个卡片
function deleteClick(index) {
    window.event.stopPropagation();
    cardsData.splice(index, 1)
    setCardsData(cardsData)
}
//下一页
nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';
    // console.log(cardsEl);
    currentActiveCard += 1;
    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1
    }
    cardsEl[currentActiveCard].className = 'card active'
    // console.log(cardsEl);
    updateCurrentText();
    setCurrentPage()
})
//上一页
prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';
    // console.log(cardsEl);
    currentActiveCard -= 1;
    if (currentActiveCard < 0) {
        currentActiveCard = 0
    }
    cardsEl[currentActiveCard].className = 'card active'
    // console.log(cardsEl);
    updateCurrentText();
    setCurrentPage()
})
//添加新卡片
showBtn.addEventListener('click', () => {
    addContainer.classList.add('show')
})
//关闭新卡片
hideBtn.addEventListener('click', () => {
    addContainer.classList.remove('show')
})
// 关闭编辑卡片
editHideBtn.addEventListener('click', () => {
    editContainer.classList.remove('show');
})

//一键清除
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardContainer.innerHTML = "";
    window.location.reload();
})
//添加卡片按钮
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value
    const answer = answerEl.value
    // console.log(question, answer)
    if (question.trim() && answer.trim()) {
        const newCard = { question, answer };
        createCard(newCard);
        questionEl.value = "";
        answerEl.value = "";
        addContainer.classList.remove('show')
        cardsData.push(newCard)
        setCardsData(cardsData)
    }
})