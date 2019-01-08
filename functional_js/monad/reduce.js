function foldMap(f, xs, monoid) {
    let m = monoid.zero;
    for (const x of xs) {
        m = monoid.plus(m, f(x));
    }
    return m;
}

const endo = {
    zero: x => x,
    plus: (f, g) => x => g(f(x))
};

function reduce(f, init, xs) {
    return foldMap(x => a => f(a, x), xs, endo)(init);
}

const add = (a, b) => a + b;

foldMap()

console.log(
    reduce(add, 0, [1, 2, 3, 4, 5])
);
