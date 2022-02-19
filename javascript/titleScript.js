import {startIntroArea} from "./introScript.js";

let titleArea = document.createElement('div');
titleArea.id = 'titleArea';
document.body.append(titleArea);

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

let childArray = titleArea.children;
let fadeIn = 'fadeIn 0.5s linear forwards';
childArray[0].style.animation = fadeIn;
for (let i = 0; i < childArray.length - 1; i++) {
    childArray[i].onanimationend = function () {
        if (i !== 4) childArray[i + 1].style.animation = fadeIn;
        if (i === 3) {
            childArray[4].style.animation = 'slideRight 0.7s ease-out forwards';
            childArray[5].style.animation = 'slideLeft 0.7s ease-out forwards';
        }
        if (i === 5) childArray[6].style.animation = fadeIn + ', zoomIn 0.5s 0.5s ease-in alternate infinite';
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
    }, 0.5 * 1000);
}