const equal = (a, b) => a === b;
const both = (a, b) => a && b;
const _head = xs => xs[0];
const _tail = (xs) => {
    const [, ...tail] = xs;
    return tail;
};

const each = (xs, f) => {
    for (const x of xs) {
        f(x);
    }
};

function reduce(array, fn, init) {
    const argsLen = arguments.length;
    const isCurried = typeof array === 'function';
    const hasInitValue =
        both(isCurried, equal(argsLen, 2)) ||
        both(!isCurried, equal(argsLen, 3));
    const [reducer, _init] = isCurried ? [array, fn] : [fn, init];

    function _reduce(list) {
        const copy = hasInitValue ? [...list] : _tail(list);
        let reduced = hasInitValue ? _init : _head(copy);
        each(copy, (item, idx) => {
            reduced = reducer(reduced, item, idx);
        });
        return reduced;
    }
    return isCurried ? _reduce : _reduce(array);
}
