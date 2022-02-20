// alert(screen.width + '/' + screen.height + ','
//     + outerWidth + '/' + outerHeight);
export {heightRatio};
let width = Math.min(screen.width, screen.height);
let height = Math.max(screen.width, screen.height);
let widthRatio = width / 450;
let heightRatio = height / 850;

if (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
    if (width < 450) {
        widthRatio = width < 360
            ? widthRatio
            : widthRatio
        document.body.style.width = width + 'px';
    } else {
        widthRatio = widthRatio * 0.7;
        document.body.style.marginTop = width < 1000
            ? 150 * heightRatio + 'px'
            : 200 * heightRatio + 'px'
    }
    document.body.style.transform = `scale(${widthRatio})`;
} else {
    document.body.style.marginTop = '60px';
}