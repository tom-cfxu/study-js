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
        }, 1000)
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
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    // console.log(data);
    const
}