exports.boil = (material) => {
    if (material === 'ice') {
        return 'water';
    }
    return 'steam';
};

exports.refrigerate = (item) => {
    if (item === 'steam') {
        return 'water';
    }
    return 'ice';
};
