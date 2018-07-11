// 집합 - 무한 집합

const infinite = (function* () {
    let n = 0;
    while (1) {
        yield n;
        n += 1;
    }
}());

const take = iterator => (n) => {
    let loop = n;
    const results = [];
    while (loop + 1) {
        results.push(iterator.next().value);
        loop -= 1;
    }
    return results;
};

console.log(
    take(infinite)(1000),
);
