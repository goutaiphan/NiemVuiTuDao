import {deAccent} from "./functionScript.js";

let width = window.screen.availWidth < window.screen.availHeight
    ? window.screen.availWidth
    : window.screen.availHeight;
let widthRatio = width / 500 < 1
    ? width / 500
    : 1;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.body.style.transform = `scale(${widthRatio})`;
}

let titleArea = document.getElementById('titleArea');
titleArea.style.paddingTop = 350 * widthRatio + 'px';

let array0 = ['Niềm', 'vui', 'tu', 'Đạo',
    'Chương trình hỏi đáp về<br>Đức Chí Tôn, Đức Ngọc Hoàng Thượng Đế',
    'Bắt đầu'];

for (let i = 0; i < array0.length; i++) {
    let text = document.createElement('p');
    titleArea.appendChild(text);
    text.innerHTML = array0[i];
    text.style.animation = 'fadeIn 0.5s linear forwards';
    text.style.animationDelay = 0.5 * (i + 1) + 's';

    if (i === array0.length - 1) {
        text.onclick = stopTitleArea;
        text.style.animation = 'zoomIn 0.5s ease-out alternate infinite';
        text.style.animationDelay = '3s';
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

function startIntroArea() {
    let introArea = document.getElementById('introArea');
    introArea.style.paddingTop = 450 * widthRatio + 'px';

    let introBoard = document.createElement('p');
    introBoard.id = 'introBoard';
    introArea.appendChild(introBoard);

    let tieuDan = document.createElement('img');
    introArea.appendChild(tieuDan);
    tieuDan.id = 'tieuDan';
    tieuDan.src = '../media/TigerFace.png';

    let introText = document.createElement('div');
    introBoard.appendChild(introText);
    introText.id = 'introText';

    tieuDan.style.animation = 'fadeIn 0.7s 0.5s linear forwards,' +
        'bounce 0.7s 1.2s ease-in alternate infinite';
    introBoard.style.animation = 'fadeIn 0.5s 1.9s linear forwards';

    let array1 = [['Mến chào quý đạo hữu,', 'đệ là <span>Tiểu Dần</span>.'],
        'Mến chúc quý đạo hữu một năm mới',
        'nhiều <span>sức khỏe</span>, thường <span>an lạc</span> và <span>tinh tấn.</span>',
        'Nhân dịp Thánh Lễ của<br>Đức Ngọc Hoàng Thượng Đế,',
        'Tiểu Dần thân mời cả nhà cùng tham gia',
        'chương trình đố vui Niềm vui tu Đạo',
        'để cùng nhau tưởng nhớ về Ngài,',
        'vị Cha Lành từ ái của muôn sinh.'];

    for (let i = 0; i < array1.length; i++) {
        let text0 = document.createElement('p');
        let text1 = document.createElement('p');
        text0.innerHTML = array1[i][0];
        text1.innerHTML = array1[i][1];
        text0.style.animation = 'fadeIn 0.5s linear forwards';
        text1.style.animation = 'fadeIn 0.5s 1s linear forwards';

        if (i === 0) {
            introText.appendChild(text0);
            introText.appendChild(text1);
        }
    }
}