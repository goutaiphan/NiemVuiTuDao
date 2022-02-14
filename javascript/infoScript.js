export {startInfoArea};
import {introBoard} from "./introScript.js";
import {deAccent} from "./functionScript.js";
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {getDatabase, set, get, ref, child} from
        "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

let introArea = document.getElementById('introArea');
let array = ['Quý huynh tỷ vui lòng <span>đăng nhập</span> hoặc <span>đăng ký</span> để tham gia.',
    'Tài khoản <span>tồn tại</span>, quý huynh tỷ vui lòng <span>đăng nhập.</span>',
    'Tài khoản <span>chưa tồn tại</span>, quý huynh tỷ vui lòng <span>đăng ký.</span>',
    'Tối thiểu 6 ký tự, đối đa 16 ký tự.'];

let infoText = document.createElement('p');
infoText.className = 'infoText';
infoText.innerHTML = array[0];

let userID = document.createElement('input');
userID.className = 'userID';
userID.placeholder = 'Tài khoản';

let userPassword = document.createElement('input');
userPassword.className = 'userPassword';
userPassword.type = 'password';
userPassword.placeholder = 'Mật khẩu';

let infoButton = document.createElement('p');
infoButton.className = 'infoButton';
infoButton.innerHTML = 'Đăng nhập/Đăng ký';
infoButton.classList.add('unready');

const app = initializeApp({
    databaseURL: "https://tangkinhcacdaidao-userdata.asia-southeast1.firebasedatabase.app"
});
const userDatabase = getDatabase(app);
let userRef = ref(userDatabase);

function startInfoArea() {
    introBoard.appendChild(infoText);
    introBoard.appendChild(userID);
    introBoard.appendChild(userPassword);
    introBoard.appendChild(infoButton);
    introBoard.classList.add('resize');
    introArea.style.marginTop = '0';

    userID.onkeydown = function (event) {
        userID.setCustomValidity('');
        userID.classList.add('normal');
        userID.classList.remove('correct', 'incorrect');
        userPassword.value = '';
        userPassword.classList.remove('correct', 'incorrect');
        infoText.innerHTML = array[0];
        infoButton.innerHTML = 'Đăng nhập/Đăng ký';
        infoButton.classList.remove('ready');
        infoButton.classList.add('unready');
        if (['Enter', 'Return'].includes(event.key)) (userPassword.focus())
    }

    userID.onblur = function () {
        userID.value = deAccent(userID.value);
        userID.classList.remove('normal');
        if (userID.value) checkUserID();
    }

    userPassword.onkeydown = function (event) {
        userPassword.setCustomValidity('');
        userPassword.classList.add('normal');
        userPassword.classList.remove('correct', 'incorrect');
        infoButton.classList.remove('ready');
        infoButton.classList.add('unready');
        if (['Enter', 'Return'].includes(event.key)) (userPassword.blur());
    }

    userPassword.onblur = function () {
        userPassword.classList.remove('normal');
        if (userPassword.value) checkUserPassword()
    }

    function checkUserID() {
        if (userID.value.length < 6 || userID.value.length > 16) {
            userID.setCustomValidity(array[array.length - 1]);
            userID.reportValidity();
        } else {
            get(child(userRef, userID.value)).then(snapshot => {
                if (snapshot.val()) {
                    infoText.innerHTML = array[1];
                    infoButton.innerHTML = 'Đăng nhập';
                } else {
                    infoText.innerHTML = array[2];
                    infoButton.innerHTML = 'Đăng ký';
                }
                userID.classList.add('correct');
            })
        }
    }

    function checkUserPassword() {
        if (userPassword.value.length < 6 || userPassword.value.length > 16) {
            userPassword.setCustomValidity(array[array.length - 1]);
            userPassword.reportValidity();
        } else {
            if (infoButton.innerHTML === 'Đăng nhập') {
                infoText.innerHTML = array[1];
                get(child(userRef, userID.value + '/userPassword')).then(snapshot => {
                    if (snapshot.val() === null) {
                    } else if (snapshot.val() !== userPassword.value) {
                        userPassword.classList.add('incorrect');
                        userPassword.classList.remove('correct');
                    } else if (snapshot.val() === userPassword.value) {
                        userPassword.classList.add('correct');
                        userPassword.classList.remove('incorrect');
                        setTimeout(function () {
                            infoButton.classList.add('ready');
                            infoButton.classList.remove('unready');
                        }, 200)
                    }
                });
            } else {
                infoText.innerHTML = array[2];
                userPassword.classList.add('correct');
                userPassword.classList.remove('incorrect');
                setTimeout(function () {
                    infoButton.classList.remove('unready');
                    infoButton.classList.add('ready');
                }, 200)
            }
        }
    }


// const app2 = initializeApp({
//     databaseURL: "https://niemvuitudao1-default-rtdb.asia-southeast1.firebasedatabase.app/"
// }, 'app2');
// const scoreDatabase = getDatabase(app2);
// function writeUserData(userID, userPassword) {
//     let userRef = ref(userDatabase, userID);
//     set(userRef, {
//         userPassword: userPassword
//     });
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
//     infoButton.onclick = function () {
//         validate(userID, userName, userBirthday);
//     }
// }