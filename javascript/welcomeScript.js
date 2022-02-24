import {setSizeRatio, setVisibility} from "./baseScript.js";
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
setSizeRatio(area, 3, -55);
setVisibility([board, tieuDan], false);
board.style.padding = '0';
board.style.height = '0';

tieuDan.animate(fadeIn(), options(0.7, 0.2));
tieuDan.animate(bounce(0, 20),
    options(0.7, 0.9, 'ease-in', 'alternate', Infinity));
board.animate(maximize('390px', '0 30px 40px'), options(2, 4, 'ease-in-out'))
    .onfinish = function () {
    document.body.style.pointerEvents = 'visible';
}
