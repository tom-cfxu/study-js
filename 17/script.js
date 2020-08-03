// 获取节点
const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const body = document.body;

// 1.创建画布, 渲染上下文
const ctx = canvas.getContext('2d');
// 2.创建并绘制球体
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,//上升
    dy: -4//下降
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = "#0095dd";
    ctx.fill();
    ctx.closePath();
}

// 3.创建并绘制挡板
const paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 200,
    h: 10,
    speed: 8,
    dx: 0
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

// 4.创建并绘制砖块
const brickRowCount = 9; // 有几列砖块
const brickColumCount = 5; //每列有几个砖块

//创建左上角第一个方块
const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true,//可见性
}
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickColumCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = { x, y, ...brickInfo };
    }
}
//绘制所有方块
function drawBricks() {
    // console.log(bricks)
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
            ctx.fill();
            ctx.closePath();
        })
    })
}
// 5.绘制得分
let score = 0;
function drawScore() {
    ctx.font = "20px Arial"
    ctx.fillText(`得分:${score}`, canvas.width - 100, 30)
}
// 6.添加更新动画的函数update(), 使用requestAnimationFrame();
function update() {
    //更新所有绘制函数和动画
    //动画函数
    movePaddle();//移动挡板
    moveBall()//移动球
    draw();//所有绘制函数
    requestAnimationFrame(update);
};
// 7.移动挡板, 设置边界
function movePaddle() {
    paddle.x += paddle.dx;
    // console.log(paddle.x)
    //设置边界
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }
    if (paddle.x < 0) {
        paddle.x = 0;
    }
}
// 8.键盘事件控制挡板移动
function keyDown(e) {
    // console.log(1)
    switch (e.key) {
        case "ArrowRight" || "Right":
            paddle.dx = paddle.speed;
            break;
        case "ArrowLeft" || "Left":
            paddle.dx = -paddle.speed;
            break;
    }
}
function keyUp(e) {
    if (e.key == "ArrowRight" || e.key == "Right" || e.key == "ArrowLeft" || e.key == "Left") {
        paddle.dx = 0;
    }
}
// 9.移动撞击小球, 设置边界
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    //左右边界
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1
    }
    //上下边界
    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1
    }
    //撞击挡板
    if (ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.w && ball.y + ball.size > paddle.y) {
        ball.dy = -ball.speed;
    }
    // 10.撞击砖块, 更新得分
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (ball.x - ball.size > brick.x && //撞击砖块左侧
                    ball.x + ball.size < brick.x + brick.w && //撞击砖块右侧
                    ball.y + ball.size > brick.y && //撞击砖块顶部
                    ball.y - ball.size < brick.y + brick.h //撞击砖块底部
                ) {
                    ball.dy *= -1;
                    brick.visible = false;
                    increaseSource();
                }
            }
        })
    })
    // 11.游戏失误时, 还原砖块, 得分清零
    if (ball.y + ball.size > canvas.height) {
        showAllBricks();
        score = 0
    }
}
//增加得分
function increaseSource() {
    score++;
    if (score % (brickColumCount * brickRowCount) === 0) {
        showAllBricks();
    }
}
// 显示所有砖块
function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => brick.visible = true)
    })
}


//所有绘制函数
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();//绘制挡板

    drawBall();//绘制球
    drawScore();//绘制得分
    drawBricks(); //绘制砖块
}

update();

// 事件监听
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show')
}
)
closeBtn.addEventListener('click', () =>
    rules.classList.remove('show')
)
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);