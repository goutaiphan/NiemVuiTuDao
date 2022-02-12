import {startIntroArea} from "./introScript.js";

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