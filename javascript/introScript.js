export {startIntroArea, tieuDan};
import {startInfoArea} from "./infoScript.js";
import {setVisibility} from "./functionScript.js";

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
introArea.style.marginTop = '45px';
introArea.append(introBoard);

function startIntroArea() {
    document.body.append(introArea);
    document.body.append(tieuDan);
    introBoard.style.animation = 'slideTop 0.5s 2s linear forwards';
    tieuDan.style.animation = 'fadeIn 0.7s 0.5s linear forwards, bounce 0.7s 1.2s ease-in alternate infinite';
}

let i = 0;
introBoard.onanimationend = function () {
    setVisibility(introBoard, true);
    setVisibility(tieuDan, true);

    window.onclick = function () {
        window.onclick = null;
        i++;
        if (i < array.length) {
            introText.style.animation = 'fadeOut 0.5s linear forwards';
            introText.onanimationend = function () {
                introText.innerHTML = array[i];
                introText.style.animation = 'fadeIn 0.5s linear forwards';
            }
        } else {
            introText.style.animation = 'fadeOut 1s 0.5s linear forwards';
            introBoard.style.animation = 'minimize 2.5s ease-in-out forwards';
            setTimeout(function () {
                introArea.remove();
                tieuDan.remove();
                startInfoArea();
            }, 2.5 * 1000)
        }
    }
}