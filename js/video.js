var video = document.querySelector("video");
var isPlay = document.querySelector(".switch");
var progress = document.querySelector(".progress");
var expand = document.querySelector(".expand");
var video_box = document.querySelectorAll(".video_box");
var controls = document.querySelector(".controls");
var playStateUrl = document.querySelector(".playState");
var loaded = document.querySelector(".progress > .loaded");
var currPlayTime = document.querySelector(".timer > .current");
var totalTime = document.querySelector(".timer > .total");
var playStateFlag=true;

//当视频可播放的时候
video.oncanplay = function(){
    //显示视频总时长
    totalTime.innerHTML = getFormatTime(this.duration);
};

//播放按钮控制
isPlay.onclick =function () {
    play()
};
playStateUrl.onclick =function () {
    play()
};

function play(){
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playStateUrl.classList.toggle("playState_hot");
    isPlay.classList.toggle("switch_hot");
};
//播放进度
video.ontimeupdate = function(){
    var currTime = this.currentTime,    //当前播放时间
        duration = this.duration;       // 视频总时长
    //百分比
    var loadWith = currTime / duration * 100 + "%";
    //显示进度条
    loaded.style.width = loadWith;

    //显示当前播放进度时间
    currPlayTime.innerHTML = getFormatTime(currTime);
};

//跳跃播放
progress.onclick = function(){
    var event = window.event;
    video.currentTime = (event.offsetX / this.offsetWidth) * video.duration;
};

//全屏
//外层盒子占全屏宽高，内部100%
expand.onclick = function(){
    // video.webkitRequestFullScreen();
    // video_box.webkitRequestFullScreen();
    video_box.forEach(p=>{
        p.classList.toggle('box_full');
    })
};

// 播放状态下控制条隐藏
video.addEventListener('play', function () {
    none();
});
video.addEventListener('ended', function () {
    playStateUrl.classList.toggle("playState_hot");
    isPlay.classList.toggle("switch_hot");
});
video.addEventListener('pause', function () {
    block();
});
video.addEventListener('touchstart',function () {
    if(playStateFlag){
        block();
    }else{
        none();
    }
    playStateFlag=!playStateFlag;
});
function block() {
    // controls.style.opacity='1';
    playStateUrl.style.opacity='1';
}
function none() {
    // controls.style.opacity='0';
    playStateUrl.style.opacity='0';
}

// 时间转换函数
function getFormatTime(time) {
    var time = time;

    var h = parseInt(time/3600),
        m = parseInt(time%3600/60),
        s = parseInt(time%60);
    h = h < 10 ? "0"+h : h;
    m = m < 10 ? "0"+m : m;
    s = s < 10 ? "0"+s : s;

    // return h+":"+m+":"+s;
    return m+":"+s;
}

//全屏宽高旋转移动
(function(){
    var template = document.querySelector(".template").getBoundingClientRect();
    var width = template.width;
    var height = template.height;
    var org = (width/height)/2;
    var style= document.createElement("style");
    style.innerHTML = ".box_full{transform-origin: " + org*100 + "%;}";
    document.body.appendChild(style)
}());