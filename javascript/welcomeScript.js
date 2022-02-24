import {setAppearance, setSize, setVisibility} from "./baseScript.js";
import {bounce, fadeIn, fadeOut, maximize, options, slideIn} from "./animationScript.js";

// let userData = JSON.parse(sessionStorage.getItem('userData'));
let userData = {userName: 'Tĩnh Tâm', userID: 'user1'};
let array = [`Xin chúc mừng<br><span class="userName">${userData.userName}</span>`,
    `Đây là tài khoản thứ ${userData.userID.replace('user', '')}
    đăng ký thành công tại<br><span>Tàng Kinh Các Đại Đạo.</span>`];

let message = document.createElement('div');
message.className = 'message';
message.innerHTML = array[0];

let board = document.createElement('div');
board.className = 'board';
board.append(message);

let tieuDan = document.createElement('div');
tieuDan.className = 'tieuDan';

let area = document.createElement('div');
area.append(board, tieuDan);
document.body.append(area);
setVisibility([board, tieuDan], false);
setSize(area, 47, -10);

setTimeout(function () {
    setAppearance(board);
    tieuDan.animate(fadeIn(), options(0.7));
    tieuDan.animate(bounce(0, 20),
        options(0.7, 0.7, 'ease-in', 'alternate', Infinity));
    board.animate(maximize('390px', '0 30px 40px'), options(2, 3.8, 'ease-in-out'))
        .onfinish = function () {
        document.body.style.pointerEvents = 'visible';
    }
}, 0.5 * 1000);

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