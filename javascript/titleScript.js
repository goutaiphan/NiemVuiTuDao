import {startIntroArea} from "./introScript.js";
import {startInfoArea} from "./infoScript.js";
import {setSizeRatio, setVisibility} from "./baseScript.js";
import {options, fadeIn, fadeOut, slideIn, pumping} from "./animationScript.js";

let titleArea = document.createElement('div');
titleArea.id = 'titleArea';
document.body.append(titleArea);
setSizeRatio(titleArea, 20, 20);

let array = ['Niềm', 'vui', 'tu', 'Đạo',
    'Chương trình hỏi đáp về Đức Chí Tôn,',
    'Đức Ngọc Hoàng Thượng Đế',
    'Bắt đầu'];

for (let i = 0; i < array.length; i++) {
    let child;
    if (i === array.indexOf('Bắt đầu')) {
        child = document.createElement('button');
        child.onclick = stopTitleArea;
    } else {
        child = document.createElement('div');
    }
    child.innerHTML = array[i];
    child.className = 'titleArea';
    setVisibility(child, false);
    titleArea.append(child);
}

let children = titleArea.children;
children[0].animate(fadeIn(), options(0.5, 0.5));
children[1].animate(fadeIn(), options(0.5, 1));
children[2].animate(fadeIn(), options(0.5, 1.5));
children[3].animate(fadeIn(), options(0.5, 2));
children[4].animate(slideIn(-20, 0), options(0.7, 2.5, 'ease-out'));
children[5].animate(slideIn(20, 0), options(0.7, 2.5, 'ease-out'));
children[6].animate(fadeIn(), options(0.5, 3.2)).onfinish = function () {
    children[6].animate(pumping(1.07),
        options(0.5, 0, 'ease-in', 'alternate', Infinity));
};


function stopTitleArea() {
    let backgroundAudio = document.createElement('audio');
    backgroundAudio.src = '../media/FreeTheMindInNature - WuNuo.mp3';
    backgroundAudio.volume = 0.7;
    backgroundAudio.preload;
    //backgroundAudio.play();
    document.body.append(backgroundAudio);

    titleArea.animate(fadeOut(), options(0.5)).onfinish = function () {
        titleArea.remove();
        startIntroArea();
        //startInfoArea();
    }
}