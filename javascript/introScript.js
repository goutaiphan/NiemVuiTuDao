export {startIntroArea};

let introArea = document.getElementById('introArea');
function startIntroArea() {
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

    let array1 = [['Mến chào quý đạo hữu,', 'đệ là <span>Tiểu Dần</span>.'],
        ['Mến chúc quý đạo hữu một năm mới',
            'nhiều <span>sức khỏe</span>, thường <span>an lạc</span> và <span>tinh tấn.</span>'],
        'Nhân dịp Thánh Lễ của<br>Đức Ngọc Hoàng Thượng Đế,',
        'Tiểu Dần thân mời cả nhà cùng tham gia',
        'chương trình hỏi đáp Niềm vui tu Đạo',
        'để cùng nhau tưởng nhớ về Ngài,',
        'vị Cha Lành từ ái của muôn sinh.'];

    for (let i = 0; i < array1.length; i++) {
        let text0 = document.createElement('p');
        let text1 = document.createElement('p');
        text0.innerHTML = array1[i][0];
        text1.innerHTML = array1[i][1];

        if (i === 0) {
            introText.appendChild(text0);
            introText.appendChild(text1);
        }
    }
}