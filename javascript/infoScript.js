export {startInfoArea};
import {tieuDan} from "./introScript.js";
import {deAccent, randomize, sendEmail, setVisibility} from "./functionScript.js";
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
    getDatabase, set, get, ref, query, orderByChild, equalTo, limitToFirst
} from
        "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

let array = {
    normal: `Quý huynh tỷ vui lòng<br><span>đăng nhập</span> hoặc <span>đăng ký</span> để<br>tham gia chương trình.`,
    signIn: `Tài khoản <span>đã tồn tại,</span><br>
        quý huynh tỷ vui lòng điền<br>mật khẩu để <span>đăng nhập.</span>`,
    wrongPassword: `Mật khẩu <span>chưa chính xác,</span><br>
        quý huynh tỷ vui lòng <span>kiểm tra</span><br>thông tin tài khoản qua email.`,
    rightPassword: `Mật khẩu <span>chính xác,</span><br>
        quý huynh tỷ có thể <span>đăng nhập</span><br>để tham gia chương trình.`,
    signUp: `<span>Mã xác thực</span> đã gửi qua <span>email,</span><br>
        quý huynh tỷ vui lòng sử dụng<br>để <span>xác thực</span> tài khoản.`,
    wrongOTP: `Mã xác thực <span>chưa chính xác,</span><br>
        quý huynh tỷ vui lòng <span>kiểm tra</span><br>thông tin tài khoản qua email.`,
    rightOTP: `Tài khoản <span>đã xác thực,</span><br>
        quý đạo hữu có thể <span>đăng ký</span> để<br>tham gia chương trình.`,
    offline: `Kết nối mạng <span>đang tạm dừng,</span><br>
        quý huynh tỷ vui lòng <span>kiểm tra</span><br>hệ thống mạng.`
};

let infoTitle = document.createElement('div');
infoTitle.className = 'infoTitle';
infoTitle.innerHTML = 'Tàng Kinh Các<br>Đại Đạo';

let infoEmail = document.createElement('input');
infoEmail.className = 'infoEmail';
infoEmail.inputMode = 'email';
infoEmail.placeholder = 'Email';

let infoPassword = document.createElement('input');
infoPassword.className = 'infoPassword';
infoPassword.type = 'password';
infoPassword.placeholder = 'Mật khẩu';

let infoOTP = document.createElement('div');
infoOTP.className = 'infoOTP';
for (let i = 0; i < 4; i++) {
    let child = document.createElement('input');
    child.inputMode = 'numeric';
    child.maxLength = 1;
    infoOTP.append(child);
}

let infoButton = document.createElement('div');
infoButton.className = 'infoButton';
infoButton.innerHTML = 'Đăng nhập/Đăng ký';

let infoBoard = document.createElement('div');
infoBoard.className = 'infoBoard';
infoBoard.append(infoEmail, infoPassword, infoOTP, infoButton);

let infoText = document.createElement('div');
infoText.className = 'infoText';
infoText.innerHTML = array.normal;

let infoArea = document.createElement('div');
infoArea.id = 'infoArea';
infoArea.append(infoTitle, infoBoard, infoText);

let app = initializeApp({
        databaseURL: "https://tangkinhcacdaidao-userdata.asia-southeast1.firebasedatabase.app"
    }),
    userDatabase = getDatabase(app),
    userRef = ref(userDatabase);

function startInfoArea() {
    document.body.append(infoArea);
}

infoEmail.onkeydown = function (event) {
    infoEmail.setCustomValidity('');
    if (['Enter', 'Return'].includes(event.key)) (infoEmail.blur());
}

infoEmail.onfocus = function () {
    infoEmail.value = '';
    infoEmail.classList.remove('signIn', 'signUp');
    infoPassword.value = '';
    infoPassword.classList.remove('signIn', 'signUp');
    infoPassword.style.pointerEvents = 'none';

    sessionStorage.setItem('infoSection', 'normal');
    infoText.innerHTML = array['normal'];
    setInfoOTP(false);
    setInfoButton(false);
}

infoEmail.onblur = function () {
    infoPassword.style.pointerEvents = 'visible';
    infoEmail.value = infoEmail.value
        .replaceAll(' ', '')
        .replace(/(@)+/g, '@')
        .replace(/(\.)+/g, '.')
        .toLowerCase();

    if (window.navigator.onLine) {
        if (infoEmail.value) checkEmail();
    } else {
        infoText.innerHTML = array.offline;
    }
}

infoPassword.onkeydown = function (event) {
    infoPassword.setCustomValidity('');
    if (['Enter', 'Return'].includes(event.key)) (infoPassword.blur());
}

infoPassword.onfocus = function () {
    infoPassword.value = '';
    infoPassword.classList.remove('signIn', 'signUp');
    infoEmail.style.pointerEvents = 'none';

    if (!infoEmail.value) sessionStorage.setItem('infoSection', 'normal');
    infoText.innerHTML = sessionStorage.getItem('finalOTP') === 'rightOTP'
        ? array['rightOTP']
        : array[sessionStorage.getItem('infoSection')];
    setInfoButton(false);
}

infoPassword.onblur = function () {
    infoEmail.style.pointerEvents = 'visible';

    if (infoEmail.className === 'infoEmail') {
        infoEmail.focus();
    } else {
        if (window.navigator.onLine) {
            if (infoPassword.value) checkPassword();
        } else {
            infoText.innerHTML = array.offline;
        }
    }
}

for (let i = 0; i < infoOTP.children.length; i++) {
    getChild(i).oninput = function (event) {
        getChild(i).value = getChild(i).value.replace(/[^\d]/g, '');
        if (getChild(i).value) {
            i < 3 ? getChild(i + 1).focus() : getChild(i).blur();
        }
        if (event.inputType === 'deleteContentBackward') {
            for (let j = 0; j < infoOTP.children.length; j++) {
                getChild(0).focus();
                getChild(j).value = '';
            }
        }
    }

    getChild(i).onfocus = function () {
        if (i > 0 && !getChild(i - 1).value) {
            getChild(i - 1).focus();
        }
    }

    getChild(i).onblur = function () {
        checkOTP();
    }
}

function checkEmail() {
    if (!infoEmail.value.match(/\S+@\S+\.\S+/)) {
        infoEmail.setCustomValidity('Cấu trúc email không hợp lệ.');
        infoEmail.reportValidity();
    } else {
        let queryRef = query(userRef, orderByChild('userEmail'), equalTo(infoEmail.value));
        get(queryRef).then(
            function (data) {
                let infoSection = '';
                if (data.val()) {
                    infoSection = 'signIn';
                } else {
                    infoSection = 'signUp';
                    createOTP();
                }
                sessionStorage.setItem('infoSection', infoSection);
                infoEmail.classList.add(infoSection);
                infoText.innerHTML = array[infoSection];
                setInfoButton(false);
            })
    }
}

function checkPassword() {
    if (infoPassword.value.length < 8) {
        infoPassword.setCustomValidity('Mật khẩu tối thiểu 8 ký tự.');
        infoPassword.reportValidity();
    } else {
        let queryRef = query(userRef, orderByChild('userEmail'), equalTo(infoEmail.value));
        get(queryRef).then(
            function (data) {
                if (data.val()) {
                    let userData = Object.entries(data.val())[0][1];
                    if (infoPassword.value === userData.userPassword) {
                        infoPassword.classList.add('signIn');
                        infoPassword.classList.remove('signUp');
                        infoText.innerHTML = array.rightPassword;
                        setInfoButton(true);
                    } else {
                        infoText.innerHTML = array.wrongPassword;
                        navigator.vibrate(500);
                    }
                } else {
                    infoPassword.classList.add('signUp');
                    infoPassword.classList.remove('signIn');
                    setInfoButton(true);
                }
            })
    }
}

function createOTP() {
    let userOTP = randomize(1000, 9999);
    let emailBody = `<br>Mến chào quý đạo hữu.<br>Mã xác thực tài khoản tại Tàng Kinh Các Đại Đạo là:<br>
                    <h1>${userOTP}<br></h1>
                    Quý đạo hữu vui lòng sử dụng mã số này để xác thực tài khoản.<br>Xin trân trọng cảm ơn.`;
    emailBody = '<span style="font-size: 16px">' + emailBody + '</span>';
    sendEmail(infoEmail.value, 'Mã xác thực tài khoản', emailBody);
    setInfoOTP(true);
    sessionStorage.setItem('userOTP', userOTP);
}

function checkOTP() {
    let userOTP = sessionStorage.getItem('userOTP');
    let finalOTP = '';
    for (let j = 0; j < infoOTP.children.length; j++) {
        finalOTP += getChild(j).value;
    }

    if (finalOTP.length === infoOTP.children.length) {
        if (finalOTP !== userOTP) {
            infoText.innerHTML = array['wrongOTP'];
        } else {
            setInfoOTP(false);
            infoText.innerHTML = array['rightOTP'];
            sessionStorage.setItem('finalOTP', 'rightOTP');
        }
    }
}

function getChild(index) {
    return infoOTP.children[index];
}

function setInfoOTP(type) {
    setVisibility(infoOTP, type);
    sessionStorage.removeItem('finalOTP');
    if (type === true) {
        for (let j = 0; j < infoOTP.children.length; j++) {
            getChild(j).value = '';
        }
    }
}

function setInfoButton(type) {
    let infoSection = sessionStorage.getItem('infoSection');
    infoButton.innerHTML = infoSection.replace('normal', 'Đăng nhập/Đăng ký')
        .replace('signIn', 'Đăng nhập')
        .replace('signUp', 'Đăng ký');

    if (type === true) {
        infoButton.classList.add('active');
        infoButton.onclick = function () {
            infoButton.innerHTML === 'Đăng nhập'
                ? alert('Đăng nhập thành công.')
                : alert('Đăng ký thành công.')
            // set(getChild(userRef, infoEmail.value), {
            //     userPassword: infoPassword.value
            // });
        }
    } else {
        infoButton.classList.remove('active');
        infoButton.onclick = null;
    }
}

// const app2 = initializeApp({
//     databaseURL: "https://niemvuitudao1-default-rtdb.asia-southeast1.firebasedatabase.app/"
// }, 'app2');
// const scoreDatabase = getDatabase(app2);

// let userBirthday = document.createElement('div');
// introBoard.append(userBirthday);
// userBirthday.className = 'userData userBirthday';
//
// let array = ['dd', 'mm', 'yyyy'];
// for (let i = 0; i < array.length; i++) {
//     let getChild = document.createElement('input');
//     userBirthday.append(getChild);
//     getChild.placeholder = array[i];
// }
//
// for (let i = 0; i < 2; i++) {
//     let separator = document.createElement('p');
//     userBirthday.append(separator);
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
// introBoard.append(userName);
// userName.className = 'userData userName';
// userName.placeholder = 'Quý danh';

//     userName.onkeydown = function (event) {
//         userName.setCustomValidity('');
//         if (event.key.match(/[^\d\w\s\u0080-\u024F\u0300-\u036F\u1E00-\u1Eff\u1DC4]/))
//             event.preventDefault();
//         if (event.key === 'Clear') userName.value = '';
//         if (['OK', 'Enter', 'Return'].includes(event.key)) validate(infoEmail, userName, userBirthday);
//     }