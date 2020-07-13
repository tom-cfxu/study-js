const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;

populateUI();
//更新座位数及总票价
function undataSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    // console.log(selectedSeats);
    //创建新数组
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))
    // console.log(seatsIndex);

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
    const selectedSeatsCount = selectedSeats.length;
    // console.log(selectedSeatsCount)
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice
}
// 获取本地数据并渲染样式
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    console.log(selectedMovieIndex);
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
        // undataSelectedCount();
    }

    // const selectedMoviePrice =JSON.parse(localStorage.getItem('selectedMoviePrice')
}
//保存电影索引和票价
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
//电影下拉框事件监听
movieSelect.addEventListener('change', e => {
    // console.log(+e.target.value)
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    undataSelectedCount();
})
//座位点击事件
container.addEventListener('click', e => {
    // console.log(e.target)
    if (e.target.classList.contains("seat") && !e.target.classList.contains('occupied')) {
        // console.log(e.target)
        e.target.classList.toggle('selected')
        undataSelectedCount();
    }
});
// 设置初始座位和总票价
undataSelectedCount();