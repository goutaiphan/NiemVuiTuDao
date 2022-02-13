export {startIntroArea};

import {deAccent} from "./functionScript.js";

import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {getDatabase, set, get, ref, onValue, child} from
        "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

// let firebaseConfig = {
//     apiKey: "AIzaSyCv-ktuvhdCSTp38qjBzDucEhRXGq8lyNU",
//     authDomain: "niemvuitudao1.firebaseapp.com",
//     projectId: "niemvuitudao1",
//     storageBucket: "niemvuitudao1.appspot.com",
//     messagingSenderId: "51572688322",
//     appId: "1:51572688322:web:3c4e276312c1e40519c25b",
//     measurementId: "G-JYT7DGZ3ZQ"
// };

const app1 = initializeApp({
    databaseURL: "https://tangkinhcacdaidao-userdata.asia-southeast1.firebasedatabase.app"
});

const app2 = initializeApp({
    databaseURL: "https://niemvuitudao1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}, 'app2');

const userDatabase = getDatabase(app1);
const scoreDatabase = getDatabase(app2);

let databaseRef = ref(userDatabase);

function readUserData() {
    onValue(databaseRef, (snapshot) => {
        let data = snapshot.val();
        console.log(data);
    });
}

readUserData();

function writeUserData(userID, userPassword) {
    let userRef = ref(userDatabase, userID);
    set(userRef, {
        userPassword: userPassword
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
    let array1 = ['Quý huynh tỷ vui lòng<br><span>đăng nhập</span> để bắt đầu.',
        'Cảm ơn Tĩnh Tâm đã đăng ký tham gia chương trình Niềm vui tu Đạo',
        'Quý đạo hữu đã sẵn sàng bắt đầu chương trình chứ?'];

    let registerText = document.createElement('p');
    introBoard.appendChild(registerText);
    registerText.className = 'registerText';
    registerText.innerHTML = array1[0];

    let userID = document.createElement('input');
    introBoard.appendChild(userID);
    userID.className = 'userData userID';
    userID.placeholder = 'Tài khoản';

    let userPassword = document.createElement('input');
    introBoard.appendChild(userPassword);
    userPassword.className = 'userData userPassword';
    userPassword.placeholder = 'Mật khẩu';
    userPassword.type = 'password';

    let registerButton = document.createElement('p');
    introBoard.appendChild(registerButton);
    registerButton.className = 'registerButton';
    registerButton.innerHTML = 'Đăng nhập';
    introBoard.classList.add('resize');
    introArea.style.marginTop = '0';

    userID.onkeydown = function (event) {
        userID.setCustomValidity('');
        if (['Enter', 'Return'].includes(event.key)) (userPassword.focus())
    }

    userID.onblur = function () {
        userID.value = deAccent(userID.value);
        if (userID.value.length < 5 || userID.value.length > 15) {
            userID.setCustomValidity('Tối thiểu 5 ký tự, tối đa 15 ký tự.');
            userID.reportValidity();
        } else {
            checkUserID(userID.value);
        }
    }

    userPassword.onkeydown = function () {
        userPassword.setCustomValidity('');
    }
    userPassword.onblur = function () {

    }

    registerButton.onclick = function () {
        console.log(userPassword.value);
        //checkUserID(userID.value);
        //writeUserData(userID.value, userPassword.value);
    }

    function checkUserID(userID) {
        let userRef = ref(userDatabase, userID);
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                registerText.innerHTML = 'Quý huynh tỷ vui lòng<br><span>đăng nhập</span> để bắt đầu.';
                registerButton.innerHTML = 'Đăng nhập';
            } else {
                registerText.innerHTML = 'Tài khoản <span>không tồn tại</span>, quý huynh tỷ vui lòng đăng ký.'
                registerButton.innerHTML = 'Đăng ký';
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    // userID.onkeydown = function (event) {
    //     userID.setCustomValidity('');
    //     if (event.key.match(/[^\d\w]/)) {
    //         userID.setCustomValidity('Chỉ bao gồm chữ và số.')
    //         userID.reportValidity();
    //     }
    // }
    //
    // userID.onkeyup = function (event) {
    //     userID.value = deAccent(userID.value);
    // }

    // let userBirthday = document.createElement('div');
    // introBoard.appendChild(userBirthday);
    // userBirthday.className = 'userData userBirthday';
    //
    // let array = ['dd', 'mm', 'yyyy'];
    // for (let i = 0; i < array.length; i++) {
    //     let child = document.createElement('input');
    //     userBirthday.appendChild(child);
    //     child.placeholder = array[i];
    // }
    //
    // for (let i = 0; i < 2; i++) {
    //     let separator = document.createElement('p');
    //     userBirthday.appendChild(separator);
    //     separator.innerHTML = '-';
    // }
    // userBirthday.onfocus = function () {
    //     userBirthday.type = 'date';
    //     userBirthday.required = ''
    // }
    // userBirthday.onblur = function () {
    //     userBirthday.type = 'text';
    // }

    // userBirthday.onkeydown = function (event) {
    //     if (event.key.match(/[^\d]/) && !['Tab'].includes(event.key))
    //         event.preventDefault();
    //     if (['Clear', 'Backspace', 'Delete'].includes(event.key)) userBirthday.value = '';
    //     if (['Enter', 'Return', 'OK'].includes(event.key)) (userName.focus())
    // }

    // userBirthday.onkeyup = function () {
    //     let inputValue = this.value;
    //     if (inputValue.match(/^\d{2}$/) !== null) {
    //         this.value = inputValue + '-';
    //     } else if (inputValue.match(/^\d{2}-\d{2}$/) !== null) {
    //         this.value = inputValue + '-';
    //     }
    // }
    //
    //
    // let userName = document.createElement('input');
    // introBoard.appendChild(userName);
    // userName.className = 'userData userName';
    // userName.placeholder = 'Quý danh';
}

//     userName.onkeydown = function (event) {
//         userName.setCustomValidity('');
//         if (event.key.match(/[^\d\w\s\u0080-\u024F\u0300-\u036F\u1E00-\u1Eff\u1DC4]/))
//             event.preventDefault();
//         if (event.key === 'Clear') userName.value = '';
//         if (['OK', 'Enter', 'Return'].includes(event.key)) validate(userID, userName, userBirthday);
//     }
//     registerButton.onclick = function () {
//         validate(userID, userName, userBirthday);
//     }
// }

function validate(userID, userName, userBirthday) {
    userName.blur();
    userName.value = userName.value.trim().replace(/\s+/g, ' ');
    if (userName.value.length > 20) {
        userName.setCustomValidity('Quý danh không quá 20 ký tự.');
    } else if (userName.value.length === 0) {
        userName.setCustomValidity('Quý danh không hợp lệ.');
    }
    userName.reportValidity();
    console.log(typeof (userBirthday.value));
    writeUserData(userID.value, userName.value, userBirthday.value);
}