export {startInfoArea};
import {introBoard} from "./introScript.js";
import {deAccent, randomize, sendEmail} from "./functionScript.js";
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
    getDatabase, set, get, ref, child, query,
    orderByChild, equalTo, limitToFirst
} from
        "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

let introArea = document.getElementById('introArea');
let array = ['Quý huynh tỷ vui lòng <span>đăng nhập/đăng ký</span> để tham gia.',
    'Tài khoản <span>tồn tại,</span><br>quý huynh tỷ vui lòng điền mật khẩu để <span>đăng nhập.</span>',
    'Tài khoản <span>chưa tồn tại,</span><br>quý huynh tỷ vui lòng điền mật khẩu để <span>đăng ký.</span>',
    '<span>Mật khẩu</span> chưa chính xác, quý huynh tỷ vui lòng xem lại thông tin tài khoản qua <span>email.</span>',
    '<span>Mã xác thực</span> đã được gửi tới <span>email,</span>' +
    'quý huynh tỷ vui lòng sử dụng để <span>xác thực</span> tài khoản.',
    'Thông tin <span>chưa chính xác,</span> quý huynh tỷ vui lòng kiểm tra lại <span>mã xác thực</span> được gửi qua <span>email.</span>'];

let infoTitle = document.createElement('p');
infoTitle.className = 'infoTitle';
infoTitle.innerHTML = 'Tàng Kinh Các<br>Đại Đạo';

let infoText = document.createElement('p');
infoText.className = 'infoText';
infoText.innerHTML = array[0];

let inputEmail = document.createElement('input');
inputEmail.className = 'inputEmail';
inputEmail.inputMode = 'email';
inputEmail.placeholder = 'Email';

let inputNumber = document.createElement('input');
inputNumber.className = 'inputNumber';
inputNumber.type = 'password';
inputNumber.inputMode = 'numeric';
setInputSection('password');

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
    introBoard.appendChild(infoTitle);
    introBoard.appendChild(inputEmail);
    introBoard.appendChild(inputNumber);
    introBoard.appendChild(infoText);
    introBoard.classList.add('resize');
}

inputEmail.onkeydown = function (event) {
    setInputSection('password');
    inputEmail.setCustomValidity('');
    if (['Enter', 'Return'].includes(event.key)) (inputNumber.focus())
}

inputEmail.onblur = function () {
    inputEmail.value = inputEmail.value
        .replaceAll(' ', '')
        .replace(/(@)+/g, '@')
        .replace(/(\.)+/g, '.');
    if (inputEmail.value) checkUserEmail();
}

inputNumber.onkeydown = function (event) {
    inputNumber.setCustomValidity('');
    inputNumber.classList.remove('correct', 'incorrect');
    if (event.key.match(/[^\d]/) && !['Backspace', 'Delete'].includes(event.key)) event.preventDefault();
    if (['Enter', 'Return'].includes(event.key)) (inputNumber.blur());
}

inputNumber.onblur = function () {
    if (inputEmail.value.length !== 0 && inputNumber.value) checkUserPassword();
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
    if (!inputEmail.value.match(/\S+@\S+\.\S+/)) {
        inputEmail.setCustomValidity('Cấu trúc email không hợp lệ.');
        inputEmail.reportValidity();
    } else {
        getUserData();
        setTimeout(function () {
            if (localStorage.getItem('userData')) {
                infoText.innerHTML = array[1];
                infoButton.innerHTML = 'Đăng nhập';
            } else {
                infoText.innerHTML = array[2];
                //setInputSection('otp');

                let otp = randomize(1000, 9999);
                localStorage.setItem('otp', otp);
                let emailBody = '<br>Mến chào quý đạo hữu.<br>Mã xác thực tài khoản tại Tàng Kinh Các Đại Đạo là:<br>' +
                    `<h1>${otp}<br></h1>` +
                    'Quý đạo hữu vui lòng sử dụng mã số này để xác thực tài khoản.<br>Xin trân trọng cảm ơn.';
                emailBody = '<span style="font-size: 16px">' + emailBody + '</span>';
                // sendEmail(inputEmail.value, 'Mã xác thực tài khoản', emailBody);
            }
            inputEmail.classList.add('correct');
        }, 500);
    }
}

function checkUserPassword() {
    if (inputNumber.value.length !== 8) {
        inputNumber.setCustomValidity('Mật khẩu 8 ký tự.');
        inputNumber.reportValidity();
    } else {
        if (infoButton.innerHTML === 'Đăng nhập') {
            infoText.innerHTML = array[1];
            getUserData();
            setTimeout(function () {
                let userData = JSON.parse(localStorage.getItem('userData'));
                console.log(userData);
                if (userData.userPassword === inputNumber.value) {
                    inputNumber.classList.add('correct');
                    inputNumber.classList.remove('incorrect');
                    introBoard.appendChild(infoButton);
                    setInfoButton(true)
                } else {
                    inputNumber.classList.add('incorrect');
                    inputNumber.classList.remove('correct');
                    infoText.innerHTML = array[3];
                    navigator.vibrate(500);
                }
            }, 500)
        } else {
            infoText.innerHTML = array[2];
            inputNumber.classList.add('correct');
            inputNumber.classList.remove('incorrect');
            setInfoButton(true)
        }
    }
}

function setInputSection(type) {
    if (type === 'password') {
        infoText.innerHTML = array[0];
        inputNumber.placeholder = 'Mật khẩu';
        inputNumber.maxLength = 8;
        inputNumber.value = '';
        inputEmail.classList.remove('correct', 'incorrect');
        inputNumber.classList.remove('correct', 'incorrect');
    } else {
        infoText.innerHTML = array[2];
        inputNumber.placeholder = 'Mã xác thực';
        inputNumber.maxLength = 4;
    }
}

function setInfoButton(type) {
    if (type === true) {
        setTimeout(function () {
            infoButton.classList.add('ready');
            infoButton.classList.remove('unready');
            infoButton.onclick = function () {
                infoButton.innerHTML === 'Đăng nhập'
                    ? alert('Đăng nhập thành công.')
                    : alert('Đăng ký thành công.')
            }
            // set(child(userRef, inputEmail.value), {
            //     userPassword: inputNumber.value
            // });
        }, 200)
    } else {
        infoButton.classList.add('unready');
        infoButton.classList.remove('ready');
        infoButton.onclick = null;
    }
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