const map = function* (fn, iter) {
    for (const a of iter) yield fn(a);
};

const filter = function* (fn, iter) {
    for (const a of iter) if (fn(a)) yield a;
};

const reduce = function* (f, acc, iter) {
    if (arguments.length == 2) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }

    for (const a of iter) acc = f(acc, a);
    return acc;
};


// console.log(
//     [...map(n => n * 2, [1, 2, 3, 4])]
// );

// console.log(
//     [...filter(n => n % 2, [1, 2, 3, 4, 5, 6])]
// );

const mul2 = n => n * 2;
const isOdd = (n) => {
    console.log('filtered');
    return n % 2 === 1;
};

console.log(
    map(mul2, filter(isOdd, [1, 2, 3, 4, 5, 6, 7, 8]))
);

console.log(
    [...map(mul2, filter(isOdd, [1, 2, 3, 4, 5, 6, 7, 8]))]
);

function* gen() {
    yield 1;
    yield 2;
    yield 3;
}

console.log(gen());

console.log(gen()[Symbol.iterator]);