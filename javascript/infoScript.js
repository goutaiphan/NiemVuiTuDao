import {createJavaScript, setVisibility, randomize, sendEmail, toTitleCase, setSizeRatio} from "./baseScript.js";
import {options, fadeIn, fadeOut, slideIn, slideOut, zoomIn} from "./animationScript.js";
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
    getDatabase, get, update, ref, query, child, orderByChild, equalTo, limitToFirst
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

let app = initializeApp({
        databaseURL: "https://tangkinhcacdaidao-userdata.asia-southeast1.firebasedatabase.app"
    }),
    userDatabase = getDatabase(app),
    userRef = ref(userDatabase);

// const app2 = initializeApp({
//     databaseURL: "https://niemvuitudao1-default-rtdb.asia-southeast1.firebasedatabase.app/"
// }, 'app2');
// const scoreDatabase = getDatabase(app2);

let array = {
    normal: `Quý huynh tỷ vui lòng<br><span>đăng nhập</span> hoặc <span>đăng ký</span><br>để tham gia chương trình.`,
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
        quý đạo hữu vui lòng điền <span>mật khẩu</span><br>để tiếp tục việc đăng ký.`,
    identify: `Quý huynh tỷ vui lòng điền<br><span>quý danh</span> và <span>sinh nhật</span><br>
        để hoàn thành việc đăng ký.`,
    offline: `Kết nối mạng <span>bị gián đoạn,</span><br>
        quý huynh tỷ vui lòng <span>kiểm tra</span><br>hệ thống mạng.`
};

let infoTitle = document.createElement('div');
infoTitle.className = 'infoTitle';
infoTitle.innerHTML = '<p>Tàng Kinh Các</p><p>Đại Đạo</p>';

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

let infoButton = document.createElement('button');
infoButton.className = 'infoButton';
infoButton.innerHTML = 'Đăng nhập/Đăng ký';

let infoButtonBox = document.createElement('div');
infoButtonBox.className = 'infoButtonBox';
infoButtonBox.append(infoButton);

let infoName = document.createElement('input');
infoName.className = 'infoName';
infoName.placeholder = 'Quý danh';

let infoBirthday = document.createElement('input');
infoBirthday.className = 'infoBirthday';
infoBirthday.inputMode = 'numeric';
infoBirthday.placeholder = 'dd-mm-yyyy';
infoBirthday.maxLength = 10;

let infoBoard = document.createElement('div');
infoBoard.className = 'infoBoard';
infoBoard.append(infoEmail, infoPassword, infoOTP, infoName, infoBirthday, infoButtonBox);

let infoText = document.createElement('div');
infoText.className = 'infoText';
infoText.innerHTML = array.normal;

let infoArea = document.createElement('div');
infoArea.append(infoTitle, infoBoard, infoText);
document.body.append(infoArea);
setSizeRatio(infoArea, 35, -30);
setVisibility([...infoTitle.children, infoBoard, ...infoBoard.children, infoText], false);

infoTitle.children[0].animate(fadeIn(), options(0.5));
infoTitle.children[1].animate(fadeIn(), options(0.5, 0.4));
infoBoard.animate(fadeIn(), options(0.5, 0.6));
infoEmail.animate(slideIn(-40, 0), options(0.5, 0.6));
infoPassword.animate(slideIn(-40, 0), options(0.5, 0.8));
infoButtonBox.animate(slideIn(-40, 0), options(0.5, 1));
infoText.animate(fadeIn(), options(0.5, 1.2));

infoEmail.onkeydown = function (event) {
    this.setCustomValidity('');
    if (['Enter', 'Return'].includes(event.key)) (this.blur());
}

infoEmail.onfocus = function () {
    this.classList.remove('signIn', 'signUp');
    infoPassword.value = '';
    infoPassword.classList.remove('signIn', 'signUp');
    infoPassword.style.pointerEvents = 'none';

    sessionStorage.setItem('infoSection', 'normal');
    infoText.innerHTML = navigator.onLine
        ? array.normal
        : array.offline;
    setInfoOTP(false);
    setInfoButton(false);
}

infoEmail.onblur = function () {
    infoPassword.style.pointerEvents = 'visible';
    this.value = infoEmail.value
        .replaceAll(' ', '')
        .replace(/(@)+/g, '@')
        .replace(/(\.)+/g, '.')
        .toLowerCase();
    if (this.value) checkEmail();
}

infoPassword.onkeydown = function (event) {
    this.setCustomValidity('');
    if (['Enter', 'Return'].includes(event.key)) (this.blur());
}

infoPassword.onfocus = function () {
    this.classList.remove('signIn', 'signUp');
    infoEmail.style.pointerEvents = 'none';

    if (!infoEmail.value) infoEmail.focus();
    if (infoEmail.classList.length === 1) {
        this.blur();
        if (infoEmail.value) checkEmail();
    }
    if (navigator.onLine) {
        infoText.innerHTML = sessionStorage.getItem('finalOTP') === 'rightOTP'
            ? array.rightOTP
            : array[sessionStorage.getItem('infoSection')];
    } else {
        infoText.innerHTML = array.offline;
    }
    setInfoButton(false);
}

infoPassword.onblur = function () {
    infoEmail.style.pointerEvents = 'visible';
    if (this.value) checkPassword();
}

for (let i = 0; i < infoOTP.children.length; i++) {
    getChild(i).oninput = function () {
        getChild(i).value = getChild(i).value.replace(/[^\d]/g, '');
        if (getChild(i).value) {
            i < 3 ? getChild(i + 1).focus() : getChild(i).blur();
        }
    }

    getChild(i).onclick = function () {
        for (let j = 0; j < infoOTP.children.length; j++) {
            getChild(0).focus();
            getChild(j).value = '';
        }
    }

    getChild(i).onblur = function () {
        checkOTP();
    }
}

infoName.onkeydown = function (event) {
    this.setCustomValidity('');
    if (['Enter', 'Return'].includes(event.key)) this.blur();
}

infoName.onfocus = function () {
    this.classList.remove('signUp');
    setInfoButton(false);
}

infoName.onblur = function () {
    this.value = toTitleCase(this.value
        .replace(/\s+/g, ' ')
        .replace(/[\d`~!@#$%^&*()+=\-_/\\|.,<>?:;'"]/g, '')
        .trim());

    if (this.value) {
        setTimeout(function () {
            infoName.classList.add('signUp');
            if (infoBirthday.classList.length > 1) setInfoButton(true);
        }, 0.25 * 1000);
    }
}

infoBirthday.onkeydown = function (event) {
    this.setCustomValidity('');
    event.target.selectionStart = this.value.length + 1;
    if (['Enter', 'Return'].includes(event.key)) this.blur();
}


infoBirthday.oninput = function (event) {
    this.value = this.value
        .replace(/[^\d-]/g, '')
        .replace(/-+/g, '-');
    if (event.inputType === 'deleteContentBackward') this.value = '';

    if (this.value.match(/^\d{2}$/)) {
        this.value = this.value + '-';
    } else if (this.value.match(/^\d{2}-\d{2}$/)) {
        this.value = this.value + '-';
    }
}

infoBirthday.onfocus = function () {
    this.classList.remove('signUp');
    setInfoButton(false);
}

infoBirthday.onblur = function () {
    if (this.value) {
        if (this.value.length !== 10) {
            this.setCustomValidity('Sinh nhật theo cấu trúc dd-mm-yyyy.');
            this.reportValidity();
        } else {
            let array = this.value.split('-');
            if (parseInt(array[0]) > 31 || parseInt(array[1]) > 12
                || parseInt(array[2]) > 1900 && parseInt(array[2]) > new Date().getFullYear()) {
                this.setCustomValidity('Sinh nhật không hợp lệ.');
                this.reportValidity();
            } else {
                setTimeout(function () {
                    infoBirthday.classList.add('signUp');
                    if (infoName.classList.length > 1) setInfoButton(true);
                }, 0.25 * 1000);
            }
        }
    }
}

function checkEmail() {
    if (!infoEmail.value.match(/\S+@\S+\.\S+/)) {
        infoEmail.setCustomValidity('Email theo cấu trúc aa@bb.cc');
        infoEmail.reportValidity();
    } else {
        let queryRef = query(userRef, orderByChild('userEmail'), equalTo(infoEmail.value));
        get(queryRef).then(
            function (data) {
                let infoSection;
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
            }).catch(function () {
            infoText.innerHTML = array.offline;
        })
    }
}

function checkPassword() {
    if (infoPassword.value.length < 8) {
        infoPassword.setCustomValidity('Mật khẩu tối thiểu 8 ký tự.');
        infoPassword.reportValidity();
    } else {
        let queryRef = query(userRef, orderByChild('userEmail'), equalTo(infoEmail.value));
        get(queryRef).then(function (data) {
            if (data.val()) {
                let userData = Object.entries(data.val())[0][1];
                if (infoPassword.value === userData['userPassword']) {
                    infoPassword.classList.add('signIn');
                    infoPassword.classList.remove('signUp');
                    infoText.innerHTML = array.rightPassword;
                    setInfoButton(true);
                } else {
                    infoText.innerHTML = array.wrongPassword;
                    navigator.vibrate(500);
                }
            } else {
                setTimeout(function () {
                    infoPassword.classList.add('signUp');
                    infoPassword.classList.remove('signIn');
                    setInfoButton(true);
                }, 0.25 * 1000);
            }
        }).catch(function () {
            infoText.innerHTML = array.offline;
        })
    }
}

function createOTP() {
    let userOTP = randomize(1000, 9999);
    console.log(userOTP);
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
            infoText.innerHTML = array.wrongOTP;
            navigator.vibrate(500);
        } else {
            setTimeout(function () {
                setInfoOTP(false);
                infoText.innerHTML = array.rightOTP;
                sessionStorage.setItem('finalOTP', 'rightOTP');
            }, 0.25 * 1000);
        }
    }
}

function setInfoOTP(type) {
    setVisibility(infoOTP, type);
    sessionStorage.removeItem('finalOTP');
    if (type === true)
        for (let j = 0; j < infoOTP.children.length; j++) {
            getChild(j).value = '';
        }
}

function getChild(index) {
    return infoOTP.children[index];
}

function setInfoButton(type) {
    infoButton.innerHTML = sessionStorage.getItem('infoSection')
        .replace('normal', 'Đăng nhập/Đăng ký')
        .replace('signIn', 'Đăng nhập')
        .replace('signUp', 'Tiếp tục')
        .replace('identify', 'Đăng ký');

    if (type === true) {
        infoButton.classList.add('active');
        infoButton.style.pointerEvents = 'visible';
        infoButton.onclick = function () {
            infoButton.style.pointerEvents = 'none';
            switch (sessionStorage.getItem('infoSection')) {
                case 'signUp':
                    sessionStorage.setItem('infoSection', 'identify');
                    infoText.innerHTML = array.identify;
                    setInfoButton(false);

                    infoEmail.animate(slideOut(40, 0), options(0.5, 0));
                    infoName.animate(slideIn(-40, 0), options(0.5, 0.3));
                    infoPassword.animate(slideOut(40, 0), options(0.5, 0));
                    infoBirthday.animate(slideIn(-40, 0), options(0.5, 0.3));
                    break;
                case 'identify':
                    //updateUserData();
                    break;
                case 'signIn':
                    break;
            }
        }
    } else {
        infoButton.classList.remove('active');
        infoButton.style.pointerEvents = 'none';
    }
}

function updateUserData() {
    get(userRef).then(function (data) {
        let userID = `user${data.size}`;
        let userData = {
            userID: userID,
            userEmail: infoEmail.value,
            userPassword: infoPassword.value,
            userName: infoName.value,
            userBirthday: infoBirthday.value
        }
        update(child(userRef, userID), userData);
        // sessionStorage.setItem('userData', JSON.stringify(userData));
        // console.log(`Xin chúc mừng ${userData.userName}, đây là tài khoản thứ
        // ${userData.userID.replace('user', '')}
        // đăng ký thành công tại Tàng Kinh Các Đại Đạo.`);
    }).catch(function () {
        infoText.innerHTML = array.offline;
    })
}