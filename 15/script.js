//获取节点
const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = "https://api.lyrics.ovh";

//获取歌曲数据
async function searchSong(term) {
    result.innerHTML = `<p>加载中...</p>`
    const res = await fetch(`${apiURL}/suggest/${term}`);
    const data = await res.json();
    // console.log(data);
    showData(data);
}

// 显示歌曲信息到DOM
function showData(data) {
    result.innerHTML = `
    <ul class ="songs">
    ${data.data
            .map(
                song => `
    <li>
<span><strong>${song.artist.name}</strong> - ${song.title}</span>
<button class="btn" data-artist ="${song.artist.name}" data-songtitle ="${song.title}">歌词</button>
</li>
    `
            )
            .join("")}
    </ul>
    `;

    if (data.prev || data.next) {
        more.innerHTML = `${
            data.prev
                ? `<button class="btn" onclick = "getMoreSongs('${data.prev}')">上一页</button>`
                : ""
            }
          ${
            data.next
                ? `<button class="btn" onclick = "getMoreSongs('${data.next}')">下一页</button>`
                : ""
            }
          `;
    } else {
        more.innerHTML = "";
    }
}

// 获取上一页&下一页歌曲信息
async function getMoreSongs(url) {
    result.innerHTML = `<p>加载中...</p>`
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();
    showData(data);
}
async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();
    // console.log(data);
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
    result.innerHTML = `<h2><strong>${artist}</strong>-${songTitle}</h2><span>${lyrics}<span>`;
    more.innerHTML = "";
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

//点击btn获取歌词
result.addEventListener("click", e => {
    const clickedEl = e.target;
    if (clickedEl.tagName === "BUTTON") {
        const artist = clickedEl.getAttribute('data-artist');
        const songTitle = clickedEl.getAttribute('data-songTitle');
        // console.log(artist, songTitle)
        getLyrics(artist, songTitle);
    }
})