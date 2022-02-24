export {
    options,
    fadeIn, fadeOut, slideOut, slideIn, zoomIn, zoomOut, minimize, maximize,
    pumping, bounce
};

function options(duration = 0,
                 delay = 0,
                 easing = 'linear',
                 direction = 'normal',
                 iterations = 1,
                 fill = 'forwards') {
    return {
        duration: duration * 1000,
        delay: delay * 1000,
        easing: easing,
        fill: fill,
        direction: direction,
        iterations: iterations
    };
}

function fadeIn() {
    return [{
        opacity: 0,
    }, {
        opacity: 1,
    }];
}

function fadeOut() {
    return [{
        opacity: 1,
    }, {
        opacity: 0,
    }];
}

function slideIn(x, y) {
    return [{
        opacity: 0,
        transform: `translate(${x}px, ${y}px)`
    }, {
        opacity: 1,
        transform: 'translate(0, 0)'
    }];
}

function slideOut(x, y) {
    return [{
        opacity: 1,
        transform: 'translate(0, 0)'
    }, {
        opacity: 0,
        transform: `translate(${x}px, ${y}px)`
    }];
}

function zoomIn(fromValue, toValue) {
    return [{
        opacity: 0,
        transform: `scale(${fromValue})`
    }, {
        opacity: 1,
        transform: `scale(${toValue})`
    }];
}

function zoomOut(fromValue, toValue) {
    return [{
        opacity: 1,
        transform: `scale(${fromValue})`
    }, {
        opacity: 0,
        transform: `scale(${toValue})`
    }];
}

function minimize() {
    return [{
        opacity: 1,
    }, {
        opacity: 0,
        height: 0,
        padding: 0
    }];
}

function maximize(height, padding) {
    return [{
        opacity: 0,
    }, {
        opacity: 1,
        height: height,
        padding: padding
    }];
}

function pumping(value) {
    return [{
        transform: `scale(${value})`
    }];
}

function bounce(x, y) {
    return [{
        transform: `translate(${x}px, ${y}px)`
    }];
}