const first = xs => xs[Symbol.iterator]().next().value;

const last = xs => Array.from(xs).splice(-1)[0];

const pipe = (...fns) => arg => fns.reduce((acc, fn) => fn(acc), arg);

const box = v => [v];

const curry = fn =>
    function f(...args) {
        return args.length >= fn.length
            ? fn(...args)
            : (...rest) => f(...args, ...rest);
    };

const curryr = fn =>
    function f(...args) {
        return args.length >= fn.length
            ? fn(...args)
            : (...rest) => f(...rest, ...args);
    };

const map = curryr((xs, f) => [...xs].map(f));

const negate = v => !v;

const filter = curryr((xs, f) => [...xs].filter(f));

const reject = curryr((xs, f) =>
    filter(
        xs,
        pipe(
            f,
            negate
        )
    )
);

// const splitLast = (xs, n) => [xs.splice(0, xs.length - n), xs.splice(-n)];
const splitLast = xs => [Array.from(xs).splice(0, xs.length - 1), last(xs)];

module.exports = {
    first,
    last,
    box,
    curry,
    curryr,
    reject,
    map,
    filter,
    negate,
    splitLast
};
