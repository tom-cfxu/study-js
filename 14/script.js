//获取节点
function $(id) {
    return document.getElementById(id);
}
const cardContainer = $('card-container'),
    prevBtn = $('prev'),
    nextBtn = $('next'),
    currentEl = $('current'),
    showBtn = $('show'),
    hideBtn = $('hiden'),
    questionEl = $('question'),
    answer = $('answer'),
    addCardBtn = $('add-card'),
    clearBtn = $('clear'),
    addContainer = $('add-container');
//当前卡片下标,便于追踪卡片
let currentActiveCard = 0;

//创建空数组储存cardDOM对象
const cardsEl = [];

//创建变量存储card里面的数据
const cardsData = [
    {
        question: '1-1=?',
        answer: '2'
    },
    {
        question: '1-1=?',
        answer: '2'
    },
    {
        question: '1-1=?',
        answer: '2'
    },
];

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
    if (index == 0) {
        card.classList.add('active')
    }
    card.innerHTML = `
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

//事件监听
//下一页
nextBtn.addEventListener('click', () => {
    console.log('下一页')
    cardsEl[currentActiveCard].className = 'card left';
    console.log(cardsEl);
    currentActiveCard++;
    cardsEl[currentActiveCard].className = 'card active'
    console.log(cardsEl);
})