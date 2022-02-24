import {createScript, createStyle, setSizeRatio, setVisibility} from "./baseScript.js";
import {options, fadeIn, fadeOut, slideIn, zoomOut, minimize, bounce} from "./animationScript.js";

let array = [`Mến chào quý đạo hữu,<br>đệ là <span>Tiểu Dần</span>.`,
    `Mến chúc quý đạo hữu<br>một năm mới nhiều<br><span>sức khỏe</span>, thường <span>an lạc</span><br>
    và <span>tinh tấn.</span>`,
    `Nhân dịp Thánh Lễ của <span>Đức Ngọc Hoàng Thượng Đế,</span>`,
    `<span>Tiểu Dần</span> thân mời<br>quý đạo hữu cùng tham gia<br>
    chương trình hỏi đáp <span><br>Niềm vui tu Đạo</span>`,
    `để cùng nhau <span>tưởng nhớ</span><br>về Ngài, vị <span>Cha Lành từ ái</span><br>của muôn sinh.`];

let board = document.createElement('div');
board.className = 'board';

let tieuDan = document.createElement('div');
tieuDan.className = 'tieuDan';

let message = document.createElement('div');
message.className = 'message';
message.innerHTML = array[0];
board.append(message);

let area = document.createElement('div');
area.append(board, tieuDan);
document.body.append(area);
setSizeRatio(area, 60, -15);
setVisibility([board, tieuDan], false);

tieuDan.animate(fadeIn(), options(0.7, 0.2));
tieuDan.animate(bounce(0, 20),
    options(0.7, 0.9, 'ease-in', 'alternate', Infinity));
board.animate(slideIn(0, 15), options(0.5, 1.6)).onfinish = function () {
    document.body.style.pointerEvents = 'visible';
}

let i = 0;
document.body.style.pointerEvents = 'none';
document.body.onclick = function () {
    document.body.style.pointerEvents = 'none';
    if (i < array.length - 1) {
        i++;
        message.animate(fadeOut(), options(0.5)).onfinish = function () {
            message.innerHTML = array[i];
            message.animate(fadeIn(), options(0.5));
            document.body.style.pointerEvents = 'visible';
        };
    } else interlude();
}

function interlude() {
    message.animate(fadeOut(), options(0.5, 0.5));
    board.animate(minimize(), options(2, 0, 'ease-in-out'));
    setTimeout(function () {
        document.body.style.pointerEvents = 'visible';
        document.body.onclick = null;
        area.remove();
        createScript('infoScript');
        createStyle('infoStyle');
    }, 4 * 1000);
}