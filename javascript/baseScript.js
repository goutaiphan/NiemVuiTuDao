export {setSizeRatio, setVisibility, deAccent, randomize, sendEmail, toTitleCase};

// alert(screen.width + '/' + screen.height + ','
//     + outerWidth + '/' + outerHeight);

function setSizeRatio(object, marginTop) {
    let width = Math.min(screen.width, screen.height);
    let height = Math.max(screen.width, screen.height);
    let widthRatio = width / 450;
    let heightRatio = height / 850;

    object.style.minWidth = 'max-content';
    if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
        if (width < 450) {
            document.body.style.width = '100vw';
            document.body.style.height = '100vh';
        } else {
            widthRatio = widthRatio * 0.7;
            object.style.marginTop = width < 1000
                ? 150 * heightRatio + 'px'
                : 200 * heightRatio + 'px'
        }
        object.style.transform = `scale(${widthRatio})`;
    } else {
        //object.style.marginTop = marginTop + 'px';
    }
}

// function check(el) {
//     var curOverf = el.style.overflow;
//
//     if ( !curOverf || curOverf === "visible" )
//         el.style.overflow = "hidden";
//
//     var isOverflowing = el.clientWidth < el.scrollWidth
//         || el.clientHeight < el.scrollHeight;
//
//     el.style.overflow = curOverf;
//
//     return isOverflowing;
// }

function setVisibility(object, type) {
    if (Array.isArray(object)) {
        object.forEach(function (item) {
            process(item);
        })
    } else {
        process(object);
    }

    function process(object) {
        if (type === true) {
            object.style.opacity = '1';
            object.style.visibility = 'visible';
        } else {
            object.style.opacity = '0';
            object.style.visibility = 'hidden';
        }
    }
}

function toTitleCase(string) {
    return string.replace(/\w\S*/g, function (data) {
            return data.charAt(0).toUpperCase() + data.substring(1).toLowerCase();
        }
    );
}

function deAccent(string) {
    return string.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\d\w]/g, '')
        .replace(/đ/ig, 'd')
        .replaceAll(' ', '')
        .toLowerCase();
}

function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let Email = {
    send: function (a) {
        return new Promise(function (n, e) {
            a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send";
            let t = JSON.stringify(a);
            Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
                n(e)
            })
        })
    }, ajaxPost: function (e, n, t) {
        let a = Email.createCORSRequest("POST", e);
        a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () {
            let e = a.responseText;
            null != t && t(e)
        }, a.send(n)
    }, ajax: function (e, n) {
        let t = Email.createCORSRequest("GET", e);
        t.onload = function () {
            let e = t.responseText;
            null != n && n(e)
        }, t.send()
    }, createCORSRequest: function (e, n) {
        let t = new XMLHttpRequest;
        return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t
    }
};

function sendEmail(emailReceiver, emailSubject, emailBody) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: 'tangkinhcacdaidao@gmail.com',
        Password: 'fyvqhyflpfyjospa',
        From: 'Tàng Kinh Các Đại Đạo <tangkinhcacdaidao@gmail.com>',
        To: emailReceiver,
        Subject: emailSubject,
        Body: emailBody,
    }).then(function () {
        console.log('Đã gửi thư thành công.');
    }).catch(function (error) {
        console.log(error.message);
    });
}