export {startIntroArea, tieuDan};
import {startInfoArea} from "./infoScript.js";
import {setSizeRatio, setVisibility} from "./baseScript.js";
import {options, fadeIn, fadeOut, slideIn, zoomOut, minimize, bounce} from "./animationScript.js";

let array = [`Mến chào quý đạo hữu,<br>đệ là <span>Tiểu Dần</span>.`,
    `Mến chúc quý đạo hữu<br>một năm mới nhiều<br><span>sức khỏe</span>, thường <span>an lạc</span><br>
    và <span>tinh tấn.</span>`,
    `Nhân dịp Thánh Lễ của <span>Đức Ngọc Hoàng Thượng Đế,</span>`,
    `<span>Tiểu Dần</span> thân mời<br>quý đạo hữu cùng tham gia<br>
    chương trình hỏi đáp <span><br>Niềm vui tu Đạo</span>`,
    `để cùng nhau <span>tưởng nhớ</span><br>về Ngài, vị <span>Cha Lành từ ái</span><br>của muôn sinh.`];

let introBoard = document.createElement('div');
introBoard.className = 'introBoard';

let tieuDan = document.createElement('div');
tieuDan.className = 'tieuDan';

let introText = document.createElement('div');
introText.className = 'introText';
introText.innerHTML = array[0];
introBoard.append(introText);

let introArea = document.createElement('div');
introArea.id = 'introArea';
introArea.append(introBoard, tieuDan);
setSizeRatio(introArea, 60, -30);

function startIntroArea() {
    document.body.append(introArea);
    setVisibility([introBoard, tieuDan], false);
    tieuDan.animate(fadeIn(), options(0.7, 0.2));
    tieuDan.animate(bounce(0, 20),
        options(0.7, 0.9, 'ease-in', 'alternate', Infinity));
    introBoard.animate(slideIn(0, 15), options(0.5, 1.6))
        .onfinish = clickIntroArea;
}

function clickIntroArea() {
    let i = 0;
    document.body.onclick = function () {
        document.body.style.pointerEvents = 'none';
        if (i < array.length - 1) {
            i++;
            introText.animate(fadeOut(), options(0.5))
                .onfinish = function () {
                introText.innerHTML = array[i];
                introText.animate(fadeIn(), options(0.5));
                document.body.style.pointerEvents = 'visible';
            };
        } else {
            introText.animate(fadeOut(), options(0.5, 0.5));
            introBoard.animate(minimize(), options(2, 0, 'ease-in-out'))
                .onfinish = function () {
                setTimeout(function () {
                    introArea.remove();
                    tieuDan.remove();
                    startInfoArea();
                    document.body.style.pointerEvents = 'visible';
                    document.body.onclick = null;
                }, 2 * 1000);
            };
        }
    }
}