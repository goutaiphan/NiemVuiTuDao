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
    normal: `Quý huynh tỷ vui lòng<br><span>đăng nhập</span> hoặc <span>đăng ký</span> để tham gia chương trình.`,
    signIn: `Tài khoản <span>tồn tại,</span><br>
        quý huynh tỷ vui lòng điền mật khẩu để <span>đăng nhập.</span>`,
    signUp: `Tài khoản <span>chưa tồn tại,</span><br>
        quý huynh tỷ vui lòng điền mật khẩu để <span>đăng ký.</span>`,
    verify: `<span>Mã xác thực</span> đã được gửi qua <span>email,</span>
        quý huynh tỷ vui lòng sử dụng để xác thực tài khoản.`,
    wrongPassword: `Mật khẩu <span>chưa chính xác,</span><br>
        quý huynh tỷ vui lòng <span>xem lại</span> thông tin tài khoản qua email.`,
    rightPassword: `Mật khẩu <span>chính xác,</span><br>
        quý huynh tỷ có thể <span>đăng nhập</span><br>để tham gia chương trình.`,
    wrongOTP: `Mã xác thực <span>chưa chính xác,</span>
        quý huynh tỷ vui lòng <span>xem lại</span> thông tin tài khoản qua email.`,
    rightOTP: `Xác thực tài khoản thành công, quý đạo hữu vui lòng điền mật khẩu để đăng ký.`
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

let infoOTP = document.createElement('input');
infoOTP.className = 'infoOTP';
infoOTP.inputMode = 'numeric';
infoOTP.placeholder = 'Mã xác thực';

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

// let otp = randomize(1000, 9999);
// localStorage.setItem('otp', otp);
// let emailBody = `<br>Mến chào quý đạo hữu.<br>Mã xác thực tài khoản tại Tàng Kinh Các Đại Đạo là:<br>
//                     <h1>${otp}<br></h1>
//                     Quý đạo hữu vui lòng sử dụng mã số này để xác thực tài khoản.<br>Xin trân trọng cảm ơn.`;
// emailBody = '<span style="font-size: 16px">' + emailBody + '</span>';
// sendEmail(infoEmail.value, 'Mã xác thực tài khoản', emailBody);

function startInfoArea() {
    document.body.append(infoArea);
    localStorage.setItem('infoGroup', 'normal');
}

infoEmail.onkeydown = function (event) {
    infoEmail.setCustomValidity('');
    infoPassword.value = '';
    setInfoText('normal');
    setInfoButton(false);
    infoEmail.classList.remove('signIn', 'signUp');
    infoPassword.classList.remove('signIn', 'signUp');
    if (['Enter', 'Return'].includes(event.key)) (infoEmail.blur());
}

infoEmail.onblur = function () {
    infoEmail.value = infoEmail.value
        .replaceAll(' ', '')
        .replace(/(@)+/g, '@')
        .replace(/(\.)+/g, '.')
        .toLowerCase();
    if (infoEmail.value) checkUserEmail();
}

infoPassword.onkeydown = function (event) {
    infoPassword.setCustomValidity('');
    setInfoText(localStorage.getItem('infoGroup'));
    setInfoButton(false);
    infoPassword.classList.remove('signIn', 'signUp');
    if (['Enter', 'Return'].includes(event.key)) (infoPassword.blur());
}

infoPassword.onblur = function () {
    if (infoEmail.value.length !== 0 && infoPassword.value) checkUserPassword();
}

// if (event.key.match(/[^\d]/) && !['Backspace', 'Delete'].includes(event.key)) event.preventDefault();

function getUserData() {
    let q = query(userRef, orderByChild('userEmail'), equalTo(infoEmail.value));
    get(q).then(snapshot => {
        if (snapshot.val()) {
            snapshot.forEach(function (snapshot) {
                localStorage.setItem('userData', JSON.stringify(snapshot.toJSON()));
                localStorage.setItem('infoGroup', 'signIn');
            })
        } else {
            localStorage.removeItem('userData');
            localStorage.setItem('infoGroup', 'signUp');
        }
    })
}

function checkUserEmail() {
    if (!infoEmail.value.match(/\S+@\S+\.\S+/)) {
        infoEmail.setCustomValidity('Cấu trúc email không hợp lệ.');
        infoEmail.reportValidity();
    } else {
        getUserData();
        setTimeout(function () {
            let infoGroup = localStorage.getItem('infoGroup');
            infoEmail.classList.add(infoGroup);
            setInfoText(infoGroup);
        }, 0.5 * 1000);
    }
}

function checkUserPassword() {
    if (infoPassword.value.length < 8) {
        infoPassword.setCustomValidity('Mật khẩu tối thiểu 8 ký tự.');
        infoPassword.reportValidity();
    } else {
        getUserData();
        setTimeout(function () {
            let userData = JSON.parse(localStorage.getItem('userData'));
            let infoGroup = localStorage.getItem('infoGroup');
            if (infoGroup === 'signIn') {
                console.log(userData);
                if (userData.userPassword === infoPassword.value) {
                    infoText.innerHTML = array.rightPassword;
                    infoPassword.classList.add('signIn');
                    infoPassword.classList.remove('signUp');
                    setInfoButton(true);
                } else {
                    infoText.innerHTML = array.wrongPassword;
                    navigator.vibrate(500);
                }
            } else {
                infoPassword.classList.add('signUp');
                infoPassword.classList.remove('signIn');
            }
        }, 0.5 * 1000)
    }
}

function setInfoText(type) {
    infoText.innerHTML = array[type];
    infoButton.innerHTML = type.replace('normal', 'Đăng nhập/Đăng ký')
        .replace('signIn', 'Đăng nhập')
        .replace('signUp', 'Đăng ký');

    if (type === true || type === 'normal') {
        infoText.classList.add('show');
        infoText.classList.remove('hide');
    } else {
        infoText.classList.add('hide');
        infoText.classList.remove('show');
    }
}

function setInfoButton(type) {
    if (type === true) {
        infoButton.classList.add('active');
        // infoButton.onclick = function () {
        //     infoButton.innerHTML === 'Đăng nhập'
        //         ? alert('Đăng nhập thành công.')
        //         : alert('Đăng ký thành công.')
        // }
        // set(child(userRef, infoEmail.value), {
        //     userPassword: infoPassword.value
        // });
    } else {
        infoButton.classList.remove('active');
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
//     infoButton.onclick = function () {
//         validate(infoEmail, userName, userBirthday);
//     }
// }