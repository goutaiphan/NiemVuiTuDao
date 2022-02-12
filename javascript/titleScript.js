import {startIntroArea} from "./introScript.js";

// alert(screen.width + '/' + screen.height + ','
//     + outerWidth + '/' + outerHeight);

if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
    let width = Math.min(screen.width, screen.height);
    let height = Math.max(screen.width, screen.height);
    let widthRatio = width / 450;
    let heightRatio = height / 850;

    if (width < 450) {
        widthRatio = width < 360
            ? widthRatio
            : widthRatio
        document.body.style.width = width + 'px';
    } else {
        widthRatio = widthRatio * 0.7;
        document.body.style.marginTop = width < 1000
            ? 150 * heightRatio + 'px'
            : 200 * heightRatio + 'px'
    }
    document.body.style.transform = `scale(${widthRatio})`;

} else {
    document.body.style.marginTop = '60px';
}

let titleArea = document.getElementById('titleArea');
let array0 = ['Niềm', 'vui', 'tu', 'Đạo',
    'Chương trình hỏi đáp về Đức Chí Tôn,',
    'Đức Ngọc Hoàng Thượng Đế',
    'Bắt đầu'];
for (let i = 0; i < array0.length; i++) {
    let text = document.createElement('p');
    titleArea.appendChild(text);
    text.innerHTML = array0[i];
    if (i === array0.length - 1) {
        text.onclick = stopTitleArea;
    }
}

function stopTitleArea() {
    let groundAudio = document.createElement('audio');
    document.body.appendChild(groundAudio);
    groundAudio.src = '../media/FreeTheMindInNature - WuNuo.mp3';
    groundAudio.volume = 0.7;
    groundAudio.preload;
    //groundAudio.play();

    titleArea.style.animation = 'fadeOut 0.5s linear forwards';
    setTimeout(function () {
        document.body.removeChild(titleArea);
        startIntroArea();
    }, 500);
}