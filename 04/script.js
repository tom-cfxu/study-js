
//获取节点
const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const swap = document.getElementById('swap');
const rateEl = document.getElementById('rate');

//获取汇率并实现dom节点更新
function calculate() {
    // console.log(123)
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    console.log(currency_one, currency_two);

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`).then(res => res.json().then(data => {
        const rate = data.rates[currency_two]
        // console.log(rate)

        rateEl.innerText = `1${currency_one}=${rate}${currency_two}`;
        amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    }))
};


//事件监听
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
})


calculate();