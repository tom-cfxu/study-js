// 获取节点
function $(id) {
    return document.getElementById(id)
}
const musicContainer = $('music-container'),
    playBtn = $('play'),
    prevBtn = $('prev'),
    nextBtn = $('next'),

    audio = $('audio'),
    progress = $('progress'),
    progress2 = $('progress2'),
    progressContainer = $('progress-container'),
    title = $('title'),
    cover = $('cover'),
    volumeBtn = $('volume'),
    progressVolumeContainer = $('progress-volume-container'),
    progressVolume = $('progress-volume');

//歌曲名称
const songs = ['99RadioService - YOUTHFUL', '99RadioService - STAR', '99RadioService - COLORFUL'];

//创建下标追踪歌曲
let songIndex = 0;  //默认歌曲下标
let volume = 0.5; //默认音量
let currentVolume;
//初始化页面时加载歌曲到DOM节点中
loadSong(songs[songIndex]);
//暂停
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fa').classList.remove('fa-pause');
    playBtn.querySelector('i.fa').classList.add('fa-play');
    audio.pause();
};
//播放
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fa').classList.remove('fa-play');
    playBtn.querySelector('i.fa').classList.add('fa-pause');
    audio.play();
};

//上一首
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//下一首
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
//更新进度条
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    // console.log(progressPercent)
    progress.style.width = `${progressPercent}%`;

}
//点击进度条
function setProgress(e) {
    const width = this.clientWidth;
    // console.log(width)
    const clickX = e.offsetX;
    // console.log(clickX);
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
//loadSong函数
function loadSong(song) {
    title.innerHTML = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `imgs/${song}.png`;
    audio.volume = volume;
}
//playBtn监听点击事件
playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
})
//更新音量
function updateVolumeProgress(e) {
    // console.log(e)
    const volume = e.srcElement.volume;
    progress2.style.height = `${volume * 100}%`;
    switch (volume) {
        case 0:
            volumeBtn.querySelector('i.fa').classList.remove('fa-volume-up');
            volumeBtn.querySelector('i.fa').classList.remove('fa-volume-dowm');
            volumeBtn.querySelector('i.fa').classList.add('fa-volume-off');
            break;
        case 1:
            volumeBtn.querySelector('i.fa').classList.remove('fa-volume-dowm');
            volumeBtn.querySelector('i.fa').classList.remove('fa-volume-off');
            volumeBtn.querySelector('i.fa').classList.add('fa-volume-up');
            break;
        default:
            volumeBtn.querySelector('i.fa').classList.remove('fa-volume-up');
            volumeBtn.querySelector('i.fa').classList.remove('fa-volume-off');
            volumeBtn.querySelector('i.fa').classList.add('fa-volume-dowm');
            break;
    }
}
//点击音量
function setVolumeProgress(e) {
    console.log(e);
    const height = this.clientHeight;
    const clickY = e.offsetY;
    console.log(height, clickY)
    audio.volume = ((height - clickY) / height);
    audio.volume = (clickY / height);
}
//修改音量图标
function setVolume(v) {
    audio.volume = v;
}

//音量进度条点击事件
progressVolume.addEventListener('click', setVolumeProgress)
//volumeBtn监听事件
volumeBtn.addEventListener('click', () => {
    //保存当前音量
    // console.log(audio.volume);
    if (audio.volume > 0) {
        currentVolume = audio.volume;
        setVolume(0);
    } else {
        setVolume(currentVolume);
    }
})
volumeBtn.addEventListener('mouseover', () => {
    progressVolumeContainer.classList.add('show');
    // console.log(progressVolumeContainer)
    musicContainer.addEventListener('mouseleave', () => {
        progressVolumeContainer.classList.remove('show');
    })
})
//切换歌曲
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
//更新进度条
audio.addEventListener("timeupdate", updateProgress);
//更新音量
audio.addEventListener('volumechange', updateVolumeProgress);
//点击进度条容器,更新歌曲播放
progressContainer.addEventListener("click", setProgress);

//播放结束自动切换
audio.addEventListener('ended', nextSong);