import {deAccent} from "./functionScript.js";

let titleArea = document.getElementById('titleArea');
let array = ['Niềm', 'vui', 'tu', 'Đạo'];
for (let i = 0; i < array.length; i++) {
    let title = document.createElement('p');
    titleArea.appendChild(title);
    title.id = deAccent(array[i]).toLowerCase();
    title.innerHTML = array[i];
}

let intro = document.createElement('p');
titleArea.appendChild(intro);
intro.id = 'intro';
intro.innerHTML = 'Bộ sưu tập câu hỏi về Đức Chí Tôn,<br>Đức Ngọc Hoàng Thượng Đế.';

let buttonStart = document.createElement('button');
titleArea.appendChild(buttonStart);
buttonStart.id = 'buttonStart';
buttonStart.innerHTML = 'Bắt đầu';

let backgroundSound = document.getElementById('backgroundSound');
backgroundSound.src = '../media/FreeTheMindInNature - WuNuo.mp3';
backgroundSound.volume = 0.7;
buttonStart.onclick = function () {
    //backgroundSound.play();
    titleArea.style.animation = 'fadeOut 0.5s linear forwards';
}