function $(id) {
    return document.getElementById(id)
}
//获取dom节点
const balance = $('balance'),
    money_plus = $('money-plus'),
    money_minus = $('money-minus'),
    list = $('list'),
    form = $('form'),
    text = $('text'),
    amount = $('amount');
//创建虚拟交易
const dummyTransaction = [
    { id: 1, text: "鲜花", amount: -5 },
    { id: 2, text: "书本", amount: -20 },
    { id: 3, text: "牛奶", amount: -10 },
    { id: 4, text: "相机", amount: -150 },
    { id: 5, text: "薪水", amount: 5000 },
];

const localStrageTransaction = JSON.parse(
    localStorage.getItem("transactions")
)

let transactions = localStorage.getItem("transactions") !== null ? localStrageTransaction : [];

//添加transactions交易到DOM LIST中
function addTransactionDOM(transaction) {
    //获取金额前面的符号
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    //基于金额正负来添加类名
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount).toFixed(2)}</span> <button onclick="removeTransaction(${transaction.id})" class="delete-btn">x</button>
    `
    list.appendChild(item);
}

//更新余额,收入,支出的金额
function updateValues() {
    //通过map方法获取交易金额数组
    const amount = transactions.map(transaction => transaction.amount);
    //reduce方法得到金额
    const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
    // console.log(total);
    // console.log(amount);

    //filter() &reduce()
    const income = amount.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
    const expense = amount.filter(item => item < 0).reduce((acc, item) => (acc += Math.abs(item)), 0).toFixed(2);
    // console.log(income, expense)
    balance.innerText = `$${total}`;
    money_plus.innerText = `+$${income}`;
    money_minus.innerText = `-$${expense}`;
}

//添加新交易
function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("请输入交易名称和金额!")
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = "";
        amount.value = "";
    }

}
//创建ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

//根据id删除历史数据

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}
//更新本地存储的数据
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions))
}
//form监听事件监听
form.addEventListener('submit', addTransaction)
//初始化应用
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}
init();