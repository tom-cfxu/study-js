//获取DOM节点

const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter')

let limit = 5;
let page = 1;

//fetch post from API

async function getPosts() {
    const res = await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();
    return data;
}

//show post in DOM
async function showPosts() {
    const posts = await getPosts();
    console.log(posts);
    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">
                ${post.body}
            </p>
        </div>
        `
        postsContainer.appendChild(postEl)
    });
}
//筛选过滤
function filterPosts(e) {
    const term = e.target.value.toUpperCase();
    // console.log(term)
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();
        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = "flex";
        } else {
            post.style.display = "none";
        }
    })
}
//显示加载
function showLoading() {
    loading.classList.add('show');
    setTimeout(() => {
        loading.classList.remove('show')
        setTimeout(() => {
            page++;
            showPosts();
        }, 100)
    }, 1000)
}
//显示页面帖子
showPosts();
// 事件监听
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
        // console.log('到了底部')
        showLoading();

    }
    // console.log(document.documentElement.scrollHeight)
    // console.log(document.documentElement.scrollTop)
    // console.log(document.documentElement.clientHeight)
})

filter.addEventListener('input', filterPosts)