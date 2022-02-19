import {startIntroArea} from "./introScript.js";

let titleArea = document.getElementById('titleArea');
let array = ['Niềm', 'vui', 'tu', 'Đạo',
    'Chương trình hỏi đáp về Đức Chí Tôn,',
    'Đức Ngọc Hoàng Thượng Đế',
    'Bắt đầu'];

for (let i = 0; i < array.length; i++) {
    let child = document.createElement('div');
    child.innerHTML = array[i];
    child.className = 'titleArea';
    if (i === array.indexOf('Bắt đầu')) child.onclick = stopTitleArea;
    titleArea.append(child);
}

let children = titleArea.children;
children[0].classList.add('show');
for (let i = 0; i < children.length - 1; i++) {
    children[i].onanimationend = function () {
        children[i + 1].classList.add('show');
        if (i === 3) {
            children[i + 2].classList.add('show');
        }
    }
}

function stopTitleArea() {
    let backgroundAudio = document.createElement('audio');
    backgroundAudio.src = '../media/FreeTheMindInNature - WuNuo.mp3';
    backgroundAudio.volume = 0.7;
    backgroundAudio.preload;
    //backgroundAudio.play();
    document.body.append(backgroundAudio);

    titleArea.style.animation = 'fadeOut 0.5s linear forwards';
    setTimeout(function () {
        titleArea.remove();
        startIntroArea();
    }, 500);
}