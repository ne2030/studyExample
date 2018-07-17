// 집합 - 무한 집합

const infinite = (function* () {
    let n = 0;
    while (1) {
        yield n;
        n += 1;
    }
}());

const take = iterable => (n) => {
    let loop = n;
    const iterator = iterable[Symbol.iterator]();
    const results = [];
    while (loop) {
        results.push(iterator.next().value);
        loop -= 1;
    }
    return results;
};

console.log(
    take(infinite)(1000),
);

// console.log(
//     take([1, 2, 3, 4, 5, 6])(3)
// );

