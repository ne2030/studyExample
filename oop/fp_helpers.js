const _ = {};

_.reduce = (list, iter, initValue) => {
    let i = 0, l = list.length, memo = initValue === undefined ? list[i++] : initValue;
    while (i < l) {
        memo = iter(memo, list[i++]);
    }
    return memo;
};

_.callr = (arg, f) => f(arg);

_.chain = (...params) => _.reduce(params, _.callr);

module.exports = _;
