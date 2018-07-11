/* eslint no-unused-vars: 0 */

const filter = (array, fn) => {
    const newList = [];
    for (const item of array) {
        if (fn(item)) {
            newList.push(item);
        }
    }
    return newList;
};

const map = exports.map = (array, fn) => {
    const iter = fn || array;
    function _map(list) {
        const newList = [];
        for (let i = 0; i < list.length; i += 1) {
            newList.push(iter(list[i], i));
        }
        return newList;
    }
    if (fn) return _map(array);
    return _map;
};

const each = exports.each = (array, fn) => {
    const iter = fn || array;
    function _each(list) {
        for (let i = 0; i < list.length; i += 1) {
            iter(list[i], i);
        }
    }
    if (fn) _each(array);
    return _each;
};

const sort = exports.sort = (array, fn) => {
    const sorter = fn || array;
    function _sort(list) {
        return list.sort(sorter);
    }
    if (fn) return _sort(array);
    return _sort;
};

// -> pipe 함수
const chain = exports.chain = (...fns) => {
    return function (...params) {
        let init = true;
        let result = null;
        for (const fn of fns) {
            if (init) {
                result = fn(...params);
                init = false;
            } else {
                result = fn(result);
            }
        }
        return result;
    };
};

const reduce = exports.reduce = function (array, fn, init) {
    const reducer = typeof fn === 'function' ? fn : array;
    const _init = arguments.length === 3 ? init : arguments.length === 2 && typeof array === 'function' ? fn : undefined;
    function _reduce(list) {
        const copyList = list.slice();
        let reduced = _init === undefined ? copyList[0] : _init;
        if (_init === undefined) copyList.splice(0, 1);
        each(copyList, (item) => { reduced = reducer(reduced, item); });
        return reduced;
    }
    if (typeof fn === 'function') return _reduce(array);
    return _reduce;
};

exports.pipe = (...fns) => {
    return (arg) => {
        return reduce(fns, (result, fn) => {
            return fn(result);
        }, arg);
    };
};

const curry = exports.curry = fn => (a) => {
    return arguments.length === 2 ? fn(...arguments) : b => fn(a, b);
};

const curryr = exports.curryr = fn => (a) => {
    return arguments.length === 2 ? fn(...arguments) : b => fn(b, a);
};

exports.filter = curryr(filter);
