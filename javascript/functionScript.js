export {deAccent};

function deAccent(string) {
    let normalization = string.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/ig,'d');
    return normalization.replace(/ \D/g, function (match) {
        return match.toUpperCase().replaceAll(' ', '');
    });
}