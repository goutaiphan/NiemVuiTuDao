export {startInfoArea};
import {introBoard} from "./introScript.js";
import {deAccent} from "./functionScript.js";
import {Email} from "./emailScript.js";
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
    getDatabase, set, get, ref, child, query,
    orderByChild, equalTo, limitToFirst
} from
        "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

let introArea = document.getElementById('introArea');
let array = ['Quý huynh tỷ vui lòng <span>đăng nhập/đăng ký</span> để tham gia.',
    'Tài khoản <span>tồn tại</span>, quý huynh tỷ vui lòng <span>đăng nhập.</span>',
    'Tài khoản <span>chưa tồn tại</span>, quý huynh tỷ vui lòng <span>đăng ký.</span>',
    'Mã xác thực đã được gửi tới email trên, quý huynh tỷ vui lòng sử dụng để đăng ký.'];

let infoText = document.createElement('p');
infoText.className = 'infoText';
infoText.innerHTML = array[0];

let inputEmail = document.createElement('input');
inputEmail.className = 'inputEmail';
inputEmail.placeholder = 'Email';

let inputPassword = document.createElement('input');
inputPassword.className = 'inputPassword';
inputPassword.type = 'password';
inputPassword.placeholder = 'Mật khẩu';
inputPassword.pattern = "\d*";

let infoButton = document.createElement('p');
infoButton.className = 'infoButton';
infoButton.innerHTML = 'Đăng nhập/Đăng ký';
infoButton.classList.add('unready');

let app = initializeApp({
    databaseURL: "https://tangkinhcacdaidao-userdata.asia-southeast1.firebasedatabase.app"
});
let userDatabase = getDatabase(app);
let userRef = ref(userDatabase);

function startInfoArea() {
    introBoard.appendChild(infoText);
    introBoard.appendChild(inputEmail);
    introBoard.appendChild(inputPassword);
    introBoard.appendChild(infoButton);
    introBoard.classList.add('resize');
    introArea.style.marginTop = '0';
}

inputEmail.onkeydown = function (event) {
    infoText.innerHTML = array[0];
    infoButton.innerHTML = 'Đăng nhập/Đăng ký';
    setInfoButton(false);

    inputEmail.setCustomValidity('');
    inputEmail.classList.remove('correct', 'incorrect');
    inputPassword.value = '';
    inputPassword.classList.remove('correct', 'incorrect');
    if (['Enter', 'Return'].includes(event.key)) (inputPassword.focus())
}

inputEmail.onblur = function () {
    inputEmail.value = inputEmail.value
        .replaceAll(' ', '')
        .replace(/(@)+/g, '@')
        .replace(/(\.)+/g, '.');
    if (inputEmail.value) checkUserEmail();
}

inputPassword.onkeydown = function (event) {
    setInfoButton(false);
    inputPassword.setCustomValidity('');
    inputPassword.classList.remove('correct', 'incorrect');
    if (['Enter', 'Return'].includes(event.key)) (inputPassword.blur());
}

inputPassword.onblur = function () {
    if (inputEmail.value.length === 0) {
        inputEmail.focus();
    } else {
        if (inputPassword.value) checkUserPassword()
    }
}

function getUserData() {
    let q = query(userRef, orderByChild('userEmail'), equalTo(inputEmail.value));
    get(q).then(snapshot => {
        snapshot.val()
            ? snapshot.forEach(function (snapshot) {
                localStorage.setItem('userData', JSON.stringify(snapshot.toJSON()));
            })
            : localStorage.removeItem('userData');
    })
}

function checkUserEmail() {
    if (!inputEmail.value.match(/@./)) {
        inputEmail.setCustomValidity('Email cần chứa dấu @ và dấu .');
        inputEmail.reportValidity();
    } else {
        getUserData();
        setTimeout(function () {
            if (localStorage.getItem('userData')) {
                infoText.innerHTML = array[1];
                infoButton.innerHTML = 'Đăng nhập';
            } else {
                infoText.innerHTML = array[2];
                infoButton.innerHTML = 'Đăng ký';
            }
            inputEmail.classList.add('correct');
        }, 500);
    }
}

function checkUserPassword() {
    if (inputPassword.value.length < 6) {
        inputPassword.setCustomValidity('Mật khẩu tối thiểu 6 ký tự.');
        inputPassword.reportValidity();
    } else {
        if (infoButton.innerHTML === 'Đăng nhập') {
            infoText.innerHTML = array[1];
            getUserData();
            setTimeout(function () {
                let userData = JSON.parse(localStorage.getItem('userData'));
                console.log(userData);
                if (userData.userPassword === inputPassword.value) {
                    inputPassword.classList.add('correct');
                    inputPassword.classList.remove('incorrect');
                    setInfoButton(true)
                } else {
                    inputPassword.classList.add('incorrect');
                    inputPassword.classList.remove('correct');
                    navigator.vibrate(500);
                }
            }, 500)
        } else {
            infoText.innerHTML = array[2];
            inputPassword.classList.add('correct');
            inputPassword.classList.remove('incorrect');
            setInfoButton(true)
        }
    }
}

function setInfoButton(validity) {
    if (validity === true) {
        setTimeout(function () {
            infoButton.classList.add('ready');
            infoButton.classList.remove('unready');
            infoButton.onclick = function () {
                infoButton.innerHTML === 'Đăng nhập'
                    ? alert('Đăng nhập thành công.')
                    : alert('Đăng ký thành công.')
            }
            // set(child(userRef, inputEmail.value), {
            //     userPassword: inputPassword.value
            // });
        }, 200)
    } else {
        infoButton.classList.add('unready');
        infoButton.classList.remove('ready');
        infoButton.onclick = null;
    }
}

let message = 'Mến chào quý đạo hữu.<br>Mã xác thực đăng ký tài khoản tại Tàng Kinh Các Đại Đạo là:<br>' +
    '<h1>123456</h1>' +
    'Quý đạo hữu vui lòng sử dụng mã số này để đăng ký tài khoản.<br>Xin trân trọng cảm ơn.';

function sendEmail() {
    Email.send({
        Host: "smtp.gmail.com",
        Username: 'tangkinhcacdaidao@gmail.com',
        Password: 'fyvqhyflpfyjospa',
        From: 'tangkinhcacdaidao@gmail.com',
        To: 'sb.phanquocthai@gmail.com',
        Subject: 'Mã xác thực đăng ký tài khoản',
        Body: message,
    }).then(function (error) {
        console.log(error.message);
    });
}

// const app2 = initializeApp({
//     databaseURL: "https://niemvuitudao1-default-rtdb.asia-southeast1.firebasedatabase.app/"
// }, 'app2');
// const scoreDatabase = getDatabase(app2);

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

//     userName.onkeydown = function (event) {
//         userName.setCustomValidity('');
//         if (event.key.match(/[^\d\w\s\u0080-\u024F\u0300-\u036F\u1E00-\u1Eff\u1DC4]/))
//             event.preventDefault();
//         if (event.key === 'Clear') userName.value = '';
//         if (['OK', 'Enter', 'Return'].includes(event.key)) validate(inputEmail, userName, userBirthday);
//     }
//     infoButton.onclick = function () {
//         validate(inputEmail, userName, userBirthday);
//     }
// }