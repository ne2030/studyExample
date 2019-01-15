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

// console.log(take(infinite)(1000));

// console.log(take([1, 2, 3, 4, 5, 6])(3));

// generator 의 return ?
{
    const gen = function* () {
        return [1, 2, 3];
    };

    const iter = gen();

    // console.log('iter', iter);
    // console.log('iter', iter.next());

    // for (const x of {}) {

    // }
}


// generator yield*

{
    const gen1 = function* () {
        yield [1, 2, 3, 4, 5];
    };

    const gen2 = function* () {
        yield* [1, 2, 3, 4, 5];
    };

    const iter1 = gen1();
    const iter2 = gen2();

    console.log(iter1.next());
    console.log(iter1.next());
    console.log(iter1.next());
    console.log(iter1.next());
    console.log(iter1.next());

    console.log(iter2.next());
    console.log(iter2.next());
    console.log(iter2.next());
    console.log(iter2.next());
    console.log(iter2.next());
}
