export {startInfoArea};
import {tieuDan} from "./introScript.js";
import {deAccent, randomize, sendEmail, setVisibility} from "./functionScript.js";
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
    getDatabase, set, get, ref, child, query,
    orderByChild, equalTo, limitToFirst
} from
        "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

let array = {
    normal: `Quý huynh tỷ vui lòng<br><span>đăng nhập</span> hoặc <span>đăng ký</span> để<br>tham gia chương trình.`,
    signIn: `Tài khoản <span>đã tồn tại,</span><br>
        quý huynh tỷ vui lòng điền mật khẩu để <span>đăng nhập.</span>`,
    wrongPassword: `Mật khẩu <span>chưa chính xác,</span><br>
        quý huynh tỷ vui lòng <span>xem lại</span> thông tin tài khoản qua email.`,
    rightPassword: `Mật khẩu <span>chính xác,</span><br>
        quý huynh tỷ có thể <span>đăng nhập</span> để<br>tham gia chương trình.`,
    signUp: `<span>Mã xác thực</span> đã gửi qua <span>email,</span><br>
        quý huynh tỷ vui lòng sử dụng để<br><span>xác thực</span> tài khoản.`,
    wrongOTP: `Mã xác thực <span>chưa chính xác,</span><br>
        quý huynh tỷ vui lòng <span>xem lại</span> thông tin tài khoản qua email.`,
    rightOTP: `Tài khoản <span>đã xác thực,</span><br>
        quý đạo hữu có thể <span>đăng ký</span> để<br>tham gia chương trình.`
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
});
let userDatabase = getDatabase(app);
let userRef = ref(userDatabase);

function startInfoArea() {
    document.body.append(infoArea);
}

infoEmail.onkeydown = function (event) {
    infoEmail.setCustomValidity('');
    if (['Enter', 'Return'].includes(event.key)) (infoEmail.blur());
}

alert('a'.charCodeAt(0));

infoEmail.onfocus = function () {
    infoEmail.value = '';
    infoEmail.classList.remove('signIn', 'signUp');
    infoPassword.value = '';
    infoPassword.classList.remove('signIn', 'signUp');
    infoPassword.style.pointerEvents = 'none';

    infoText.innerHTML = array['normal'];
    setInfoButton('normal', false);
    setInfoOTP(false);
}

infoEmail.onblur = function () {
    infoPassword.style.pointerEvents = 'visible';
    infoEmail.value = infoEmail.value
        .replaceAll(' ', '')
        .replace(/(@)+/g, '@')
        .replace(/(\.)+/g, '.')
        .toLowerCase();
    if (infoEmail.value) checkEmail();
}

infoPassword.onkeydown = function (event) {
    infoPassword.setCustomValidity('');
    if (['Enter', 'Return'].includes(event.key)) (infoPassword.blur());
}

infoPassword.onfocus = function () {
    infoPassword.value = '';
    infoPassword.classList.remove('signIn', 'signUp');
    infoEmail.style.pointerEvents = 'none';

    let infoSection = sessionStorage.getItem('infoSection');
    setInfoButton(infoSection, false);
    let finalOTP = sessionStorage.getItem('finalOTP');
    finalOTP === 'rightOTP'
        ? infoText.innerHTML = array[finalOTP]
        : infoText.innerHTML = array[infoSection];
}

infoPassword.onblur = function () {
    infoEmail.style.pointerEvents = 'visible';
    if (infoEmail.value.length !== 0 && infoPassword.value) checkPassword();
}

for (let i = 0; i < infoOTP.children.length; i++) {
    child(i).oninput = function (event) {
        if (event === 'deleteContentBackward') {
            console.log(true);
        }
    }

    child(i).onkeydown = function (event) {
        if (event.key.match(/[^\d]/)) event.preventDefault();
        if (['Backspace', 'Delete'].includes(event.key) || event.code === '8') {
            child(0).focus();
            for (let j = 0; j < infoOTP.children.length; j++) {
                infoOTP.children[j].value = '';
            }
        }
        if (['Enter', 'Return'].includes(event.key)) {
            child(i).blur();
        }
    }

    child(i).oninput = function () {
        if (child(i).value) {
            i < 3 ? child(i + 1).focus() : child(i).blur();
        }
    }

    child(i).onfocus = function () {
        if (i > 0 && child(i - 1).value === '') {
            child(i - 1).focus();
        }
    }

    child(3).onblur = function () {
        let finalOTP = '';
        for (let j = 0; j < infoOTP.children.length; j++) {
            finalOTP += infoOTP.children[j].value;
        }
        sessionStorage.setItem('finalOTP', finalOTP);
        checkOTP();
    }

    function child(index) {
        return infoOTP.children[index];
    }
}

function getUserData() {
    let q = query(userRef, orderByChild('userEmail'), equalTo(infoEmail.value));
    get(q).then(snapshot => {
        if (snapshot.val()) {
            snapshot.forEach(function (snapshot) {
                sessionStorage.setItem('userData', JSON.stringify(snapshot.toJSON()));
                sessionStorage.setItem('infoSection', 'signIn');
            })
        } else {
            sessionStorage.removeItem('userData');
            sessionStorage.setItem('infoSection', 'signUp');
        }
    })
}

function checkEmail() {
    if (!infoEmail.value.match(/\S+@\S+\.\S+/)) {
        infoEmail.setCustomValidity('Cấu trúc email không hợp lệ.');
        infoEmail.reportValidity();
    } else {
        getUserData();
        setTimeout(function () {
            let infoSection = sessionStorage.getItem('infoSection');
            infoEmail.classList.add(infoSection);
            infoText.innerHTML = array[infoSection];
            setInfoButton(infoSection, false);

            if (infoSection === 'signUp') {
                setInfoOTP(true);
                let userOTP = randomize(1000, 9999);
                sessionStorage.setItem('userOTP', userOTP);
                sessionStorage.removeItem('finalOTP');
                let emailBody = `<br>Mến chào quý đạo hữu.<br>Mã xác thực tài khoản tại Tàng Kinh Các Đại Đạo là:<br>
                    <h1>${userOTP}<br></h1>
                    Quý đạo hữu vui lòng sử dụng mã số này để xác thực tài khoản.<br>Xin trân trọng cảm ơn.`;
                emailBody = '<span style="font-size: 16px">' + emailBody + '</span>';
                sendEmail(infoEmail.value, 'Mã xác thực tài khoản', emailBody);
            }
        }, 0.5 * 1000);
    }
}

function checkPassword() {
    if (infoPassword.value.length < 8) {
        infoPassword.setCustomValidity('Mật khẩu tối thiểu 8 ký tự.');
        infoPassword.reportValidity();
    } else {
        getUserData();
        setTimeout(function () {
            let userData = JSON.parse(sessionStorage.getItem('userData'));
            let infoSection = sessionStorage.getItem('infoSection');
            if (infoSection === 'signIn') {
                console.log(userData);
                if (infoPassword.value === userData.userPassword) {
                    infoText.innerHTML = array.rightPassword;
                    infoPassword.classList.add('signIn');
                    infoPassword.classList.remove('signUp');
                    setInfoButton(infoSection, true);
                } else {
                    infoText.innerHTML = array.wrongPassword;
                    navigator.vibrate(500);
                }
            } else {
                infoPassword.classList.add('signUp');
                infoPassword.classList.remove('signIn');
                setInfoButton(infoSection, true);
            }
        }, 0.5 * 1000);
    }
}

function checkOTP() {
    let userOTP = sessionStorage.getItem('userOTP');
    let finalOTP = sessionStorage.getItem('finalOTP');
    if (finalOTP !== userOTP) {
        infoText.innerHTML = array['wrongOTP'];
    } else {
        infoText.innerHTML = array['rightOTP'];
        setInfoOTP(false);
        sessionStorage.setItem('finalOTP', 'rightOTP');
    }
}

function setInfoOTP(type) {
    setVisibility(infoOTP, type);
    if (type === true) {
        for (let j = 0; j < infoOTP.children.length; j++) {
            infoOTP.children[j].value = '';
        }
    }
}

function setInfoButton(infoSection, type) {
    infoButton.innerHTML = infoSection.replace('normal', 'Đăng nhập/Đăng ký')
        .replace('signIn', 'Đăng nhập')
        .replace('signUp', 'Đăng ký');

    if (type === true) {
        infoButton.classList.add('active');
        infoButton.onclick = function () {
            infoButton.innerHTML === 'Đăng nhập'
                ? alert('Đăng nhập thành công.')
                : alert('Đăng ký thành công.')
            // set(child(userRef, infoEmail.value), {
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
//     let child = document.createElement('input');
//     userBirthday.append(child);
//     child.placeholder = array[i];
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