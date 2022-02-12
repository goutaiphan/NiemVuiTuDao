export {startIntroArea};

let introArea = document.getElementById('introArea');

function startIntroArea() {
    let introBoard = document.createElement('p');
    introBoard.className = 'introBoard';
    introArea.appendChild(introBoard);

    let tieuDan = document.createElement('img');
    introArea.appendChild(tieuDan);
    tieuDan.className = 'tieuDan';
    tieuDan.src = '../media/TigerFace.png';

    let introText = document.createElement('p');
    introBoard.appendChild(introText);
    introText.className = 'introText';

    let array = ['Mến chào quý đạo hữu,<br>đệ là <span>Tiểu Dần</span>.',
        'Mến chúc quý đạo hữu một năm mới nhiều <span>sức khỏe</span>, thường <span>an lạc</span> và <span>tinh tấn.</span>',
        'Nhân dịp Thánh Lễ của <span>Đức Ngọc Hoàng Thượng Đế,</span>',
        '<span>Tiểu Dần</span> thân mời cả nhà cùng tham gia<br>chương trình hỏi đáp <span><br>Niềm vui tu Đạo</span>',
        'để cùng nhau<br><span>tưởng nhớ</span> về Ngài,',
        'vị <span>Cha Lành từ ái</span><br>của muôn sinh.'];

    let i = 0;
    introText.innerHTML = array[i];
    window.onclick = function () {
        i++;
        introText.classList.add('remove');
        setTimeout(function () {
            introText.innerHTML = array[i];
            introText.classList.remove('remove');
        }, 500);
    }
}