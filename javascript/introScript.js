export {startIntroArea};

import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {getDatabase, update, ref, onValue} from
        "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCv-ktuvhdCSTp38qjBzDucEhRXGq8lyNU",
    authDomain: "niemvuitudao1.firebaseapp.com",
    databaseURL: "https://niemvuitudao1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "niemvuitudao1",
    storageBucket: "niemvuitudao1.appspot.com",
    messagingSenderId: "51572688322",
    appId: "1:51572688322:web:3c4e276312c1e40519c25b",
    measurementId: "G-JYT7DGZ3ZQ"
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase();

const starCountRef = ref(database, 'user/');
onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
});

function writeUserName(userName) {
    update(ref(database, 'user/'), {
        userName
    });
}

let introArea = document.getElementById('introArea');
introArea.style.marginTop = '40px';

let introBoard = document.createElement('p');
introBoard.className = 'introBoard';

let tieuDan = document.createElement('img');
tieuDan.className = 'tieuDan';
tieuDan.src = './media/TigerFace.png';

let introText = document.createElement('p');
introText.className = 'introText';

let array0 = ['Mến chào quý đạo hữu,<br>đệ là <span>Tiểu Dần</span>.',
    'Mến chúc quý đạo hữu<br>một năm mới nhiều <span>sức khỏe</span>, thường <span>an lạc</span> và <span>tinh tấn.</span>',
    'Nhân dịp Thánh Lễ của <span>Đức Ngọc Hoàng Thượng Đế,</span>',
    '<span>Tiểu Dần</span> thân mời<br>quý huynh tỷ cùng tham gia<br>chương trình hỏi đáp <span><br>Niềm vui tu Đạo</span>',
    'để cùng nhau<br><span>tưởng nhớ</span> về Ngài,',
    'vị <span>Cha Lành từ ái</span><br>của muôn sinh.'];

function startIntroArea() {
    introArea.appendChild(introBoard);
    introArea.appendChild(tieuDan);
    introBoard.appendChild(introText);

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

    registerInput.onkeydown = function (event) {
        registerInput.setCustomValidity('');
        if (event.key.match(/[^\d\w\s\u0080-\u024F\u0300-\u036F\u1E00-\u1Eff\u1DC4]/))
            event.preventDefault();
        if (event.key === 'Clear') registerInput.value = '';
        if (['OK', 'Enter', 'Return'].includes(event.key)) validate(registerInput);
    }
    registerButton.onclick = function () {
        validate(registerInput);
    }
}

function validate(registerInput) {
    registerInput.blur();
    registerInput.value = registerInput.value.trim().replace(/\s+/g, ' ');
    if (registerInput.value.length > 20) {
        registerInput.setCustomValidity('Quý danh không quá 20 ký tự.');
    } else if (registerInput.value.length === 0) {
        registerInput.setCustomValidity('Quý danh không hợp lệ.');
    }
    registerInput.reportValidity();
    writeUserName(registerInput.value);
}