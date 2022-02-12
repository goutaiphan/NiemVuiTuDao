export {startIntroArea};

let introArea = document.getElementById('introArea');
introArea.style.marginTop = '40px';

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

    let array0 = ['Mến chào quý đạo hữu,<br>đệ là <span>Tiểu Dần</span>.',
        'Mến chúc quý đạo hữu một năm mới nhiều <span>sức khỏe</span>, thường <span>an lạc</span> và <span>tinh tấn.</span>',
        'Nhân dịp Thánh Lễ của <span>Đức Ngọc Hoàng Thượng Đế,</span>',
        '<span>Tiểu Dần</span> thân mời<br>quý huynh tỷ cùng tham gia<br>chương trình hỏi đáp <span><br>Niềm vui tu Đạo</span>',
        'để cùng nhau<br><span>tưởng nhớ</span> về Ngài,',
        'vị <span>Cha Lành từ ái</span><br>của muôn sinh.'];

    let i = 0;
    introText.innerHTML = array0[i];
    window.onclick = function () {
        i++;
        introText.classList.add('remove');
        setTimeout(function () {
            if (i < array0.length) {
                introText.innerHTML = array0[i];
                introText.classList.remove('remove');
            } else {
                window.onclick = null;
                introBoard.removeChild(introText);
                startRegisterArea();
            }
        }, 500);
    }

    function startRegisterArea() {
        let array1 = ['Xin cho <span>Tiểu Dần</span> được biết quý danh của huynh tỷ.',
            'Cảm ơn Tĩnh Tâm đã đăng ký tham gia chương trình Niềm vui tu Đạo',
            'Quý đạo hữu đã sẵn sàng bắt đầu chương trình chứ?'];

        let registerText = document.createElement('p');
        introBoard.appendChild(registerText);
        registerText.className = 'registerText';
        registerText.innerHTML = array1[0];

        let registerInput = document.createElement('input');
        introBoard.appendChild(registerInput);
        registerInput.className = 'registerInput';
        registerInput.placeholder = 'Quý danh';

        let registerButton = document.createElement('p');
        introBoard.appendChild(registerButton);
        registerButton.className = 'registerButton';
        registerButton.innerHTML = 'Xác nhận';
        introBoard.classList.add('resize');
        introArea.style.marginTop = '0';

        let array2 = ['OK', 'Enter', 'Return'];
        registerInput.onkeydown = function (event) {
            if (array2.includes(event.key))
                registerInput.blur();
        }
    }
}