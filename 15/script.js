//获取节点
const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = "https://api.lyrics.ovh";

//获取歌曲数据
async function searchSong(term) {
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();
    // console.log(data);
    showData(data);
}
//事件监听
form.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = search.value.trim();
    // console.log(searchTerm)
    if (!searchTerm) {
        alert('请输入查询内容')
    } else {
        searchSong(searchTerm);
    }
})