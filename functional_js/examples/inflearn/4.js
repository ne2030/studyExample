const _ = require('partial-js');
const { box, first, map, filter, splitLast, curryr, reject } = require('./fn');

// 지연평가

/*
* 지연평가는 take 를 쓰지 않으면 의미가 없는 것 같은데 평소에 take 를 쓸 일이 있는지?
* 지연 평가를 쓴다면 언제 이득을 볼 수 있을지? -> 비용이 큰 함수를 돌리고 take 나 some 을 취할때
*/

{
    const delay = t => arg =>
        new Promise((res, rej) => {
            setTimeout(() => res(arg), t);
        });

    function without_lazy() {
        console.time('normal');

        _.go(_.range(100), _.map(delay(10)), _.take(5), _.hi, () =>
            console.timeEnd('normal')
        );
    }

    function with_lazy() {
        console.time('lazy');

        _.go(_.range(100), L.map(delay(10)), L.take(5), _.hi, () =>
            console.timeEnd('lazy')
        );
    }
    // without_lazy();
    // with_lazy();

    // lazy 맵은 비동기 지원이 안된다... 안타깝다
    // lazy 를 만들어보자

    const take = (n) => {
        function f(list) {
            return Array.from(list).splice(0, n);
        }
        f.count = n;
        f.lazyTake = true;
        return f;
    };

    const pipe = (...fns) => arg => fns.reduce((acc, fn) => fn(acc), arg);

    const go = (arg, ...fns) => pipe(...fns)(arg);

    const pipeL = (...fns) => (iterable) => {
        const [loopFns, take] = splitLast(fns);
        let loopEnd = false;
        const iterator = iterable[Symbol.iterator]();
        const loop = pipe(...loopFns);
        const results = [];

        while (!loopEnd && take.count > results.length) {
            const { value, done } = iterator.next();
            const r = go(value, box, loop, first);
            if (r) results.push(r);
            loopEnd = done;
        }

        return results;
    };

    const isPrime = (function () {
        function f(n) {
            if (f.cache.includes(n)) return true;
            if (
                n === 1 ||
                n === 0 ||
                n < 0 ||
                typeof n !== 'number' ||
                Number.isNaN(n)
            ) {
                return false;
            }
            let flag = true;
            let i = n - 1;
            while (flag && i > 1) {
                flag = n % i !== 0;
                i -= 1;
            }
            if (flag) f.cache.push(n);
            return flag;
        }

        f.cache = [];
        return f;
    }());

    // test(10000000);

    console.time('normal pipe');

    console.log(
        '\n',
        pipe(
            filter(isPrime),
            map(n => n % 10),
            take(10)
        )(_.range(1000))
    );

    console.timeEnd('normal pipe');

    console.time('lazy pipe');

    console.log(
        '\n\n',
        pipeL(
            filter(isPrime),
            map(n => n % 10),
            // reject(n => n === 3),
            take(10)
        )(_.range(1000))
    );

    console.timeEnd('lazy pipe');
}
