//获取节点
const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = (totalTime / 5);

// console.log(breatheTime, holdTime)

function breathAnimation() {
    text.innerText = "吸气";
    container.classList = "container grow"
    setTimeout(() => {
        text.innerText = "保持";
        setTimeout(() => {
            text.innerText = "呼气"
            container.classList = "container shrink"
        }, holdTime)
    }, breatheTime)
}
breathAnimation();
setInterval(breathAnimation, totalTime)