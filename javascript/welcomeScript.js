import {setAppearance, setSize, setVisibility} from "./baseScript.js";
import {bounce, fadeIn, maximize, options, slideIn} from "./animationScript.js";

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
setAppearance(board);

setTimeout(function () {
    setSize(area, 3, -15);
    tieuDan.animate(fadeIn(), options(0.7));
    tieuDan.animate(bounce(0, 20),
        options(0.7, 0.7, 'ease-in', 'alternate', Infinity));
    board.animate(maximize('390px', '0 30px 40px'), options(2, 3.8, 'ease-in-out'))
        .onfinish = function () {
        document.body.style.pointerEvents = 'visible';
    }
}, 0.1 * 1000);