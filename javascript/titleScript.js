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
    titleArea.appendChild(child);
}

let children = titleArea.children;
children[0].classList.add('appear');
for (let i = 0; i < children.length - 1; i++) {
    children[i].onanimationend = function () {
        if (i === 3) {
            children[i + 1].classList.add('appear');
            children[i + 2].classList.add('appear');
        } else {
            children[i + 1].classList.add('appear');
        }
    }
}

function stopTitleArea() {
    let backgroundAudio = document.createElement('audio');
    document.body.appendChild(backgroundAudio);
    backgroundAudio.src = '../media/FreeTheMindInNature - WuNuo.mp3';
    backgroundAudio.volume = 0.7;
    backgroundAudio.preload;
    //backgroundAudio.play();

    titleArea.style.animation = 'fadeOut 0.5s linear forwards';
    titleArea.onanimationend = function () {
        titleArea.remove();
        location.href = 'intro.html';
    }
}