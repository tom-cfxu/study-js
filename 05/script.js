var buttons = document.querySelectorAll('a');
// console.log(buttons)
buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        var span = document.createElement('span');
        span.style.left = x + 'px';
        span.style.top = y + 'px';
        btn.append(span)
        setTimeout(() => {
            span.remove();
        }, 800)
    })
})

//获取节点
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

//通过Fetch 获取user and add money
getRandomUser();
getRandomUser();
getRandomUser();
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    // console.log(data);
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    addData(newUser);
}

//添加随机生成对象的data数组
function addData(obj) {
    data.push(obj);
    updateDOM();
}

//财富榜 sort方法
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    updateDOM();
}
//资金翻倍
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 }
    })
    updateDOM();
}
//查找百万富翁
function showMillionaires() {
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

//计算总金额
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth<strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthEl);
}
//更新DOM
function updateDOM(provideData = data) {
    //clear main div
    main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`
    provideData.forEach((item) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element)
    })
}

//转换为货币格式
function formatMoney(number) {
    return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


//事件监听

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
