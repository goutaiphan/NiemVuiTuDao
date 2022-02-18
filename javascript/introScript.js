let introArea = document.getElementById('introArea');

let introBoard = document.createElement('div');
introBoard.className = 'introBoard';

let tieuDan = document.createElement('div');
tieuDan.className = 'tieuDan';

let introText = document.createElement('div');
introText.className = 'introText';

let array = [`Mến chào quý đạo hữu,<br>đệ là <span>Tiểu Dần</span>.`,
    `Mến chúc quý đạo hữu<br>một năm mới nhiều<br><span>sức khỏe</span>, thường <span>an lạc</span><br>
    và <span>tinh tấn.</span>`,
    `Nhân dịp Thánh Lễ của <span>Đức Ngọc Hoàng Thượng Đế,</span>`,
    `<span>Tiểu Dần</span> thân mời<br>quý đạo hữu cùng tham gia<br>
    chương trình hỏi đáp <span><br>Niềm vui tu Đạo</span>`,
    `để cùng nhau <span>tưởng nhớ</span><br>về Ngài, vị <span>Cha Lành từ ái</span><br>của muôn sinh.`];

introArea.style.marginTop = '45px';
introArea.appendChild(introBoard);
introArea.appendChild(tieuDan);
introBoard.appendChild(introText);

let i = 0;
introText.innerHTML = array[i];
window.onclick = function () {
    i++;
    introText.classList.toggle('remove');
    setTimeout(function () {
        if (i < array.length) {
            introText.innerHTML = array[i];
            introText.classList.toggle('remove');
        } else {
            window.onclick = null;
            introText.remove();
        }
    }, 500);
}