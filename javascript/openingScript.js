import {appendSection, removeSection} from "./baseScript.js";
import {options, fade, slide, pump} from "./animationScript.js";

let area = document.createElement('div');
let array = ['Niềm', 'vui', 'tu', 'Đạo',
    'Chương trình hỏi đáp về Đức Chí Tôn,',
    'Đức Ngọc Hoàng Thượng Đế',
    'Bắt đầu'];

for (let i = 0; i < array.length; i++) {
    let child = i === array.indexOf('Bắt đầu')
    ? document.createElement('button')
    : document.createElement('div');
    child.innerHTML = array[i];
    child.className = 'area';
    child.setVisibility(false);
    area.append(child);
}
area.setRatio(20, -30);
document.body.append(area);

let children = area.children;
children[0].animate(fade(), options(0.5, 0.5));
children[1].animate(fade(), options(0.5, 1));
children[2].animate(fade(), options(0.5, 1.5));
children[3].animate(fade(), options(0.5, 2));
children[4].animate(slide(-20, 0), options(0.7, 2.5, 'ease-out'));
children[5].animate(slide(20, 0), options(0.7, 2.5, 'ease-out'));
children[6].animate(fade(), options(0.5, 3.2)).onfinish = function () {
    children[6].animate(pump(1.07),
        options(0.5, 0, 'ease-in', 'alternate', Infinity));
    children[6].onclick = setInterlude;
};

function setInterlude() {
    let backgroundAudio = document.createElement('audio');
    backgroundAudio.src = '../media/FreeTheMindInNature.mp3';
    backgroundAudio.volume = 0.8;
    backgroundAudio.preload;
    backgroundAudio.loop = true;
    backgroundAudio.play().then(function () {
        console.log('Nhạc nền đã phát thành công.');
    });
    document.body.append(backgroundAudio);

    children[6].onclick = null;
    area.animate(fade(false), options(0.5)).onfinish = function () {
        appendSection('intro');
        // appendSection('info');
        removeSection(area, 'opening');
    }
}