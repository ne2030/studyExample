const _ = require('partial-js');

// const isPrime = (function () {
//     const isPrime = _.memoize((n) => {
//         n %
//     });

//     isPrime.primes = [];
//     // isPrime.
// }());

let __count = 0;
function solution(n, start = 2, primes = [], count = 0) {
    if (start > n) return count;
    const sqrt = Math.sqrt(start);
    const isPrime = primes.every((v) => {
        __count++;
        return start % v;
    });
    if (isPrime) primes.push(start);
    return solution(n, start + 1, primes, count + (isPrime ? 1 : 0));
}

console.log(solution(1000), __count);

const toBool = v => !!v;

__count = 0;

// 에라토스 테네스의 체
// const eratos = (() => {
//     const removeMultiple = (n, candidates) =>
//         _.filter(candidates, (i) => {
//             __count++;
//             return i % n;
//         });

//     const cal = (n) => {
//         let range = _.range(2, n + 1);

//         const primes = [];

//         while (range.length > 0) {
//             const prime = range.shift();
//             if (prime > Math.sqrt(n)) break;
//             primes.push(prime);
//             range = removeMultiple(prime, range);z
//         }

//         return primes.length;
//     };

//     return cal;
// })();

const eratos = (() => {
    function sol(range, n, p = 2, ps = [2]) {
        // if (Math.sqrt(n) < p) return ps.concat(range);
        // if (range.length === 0) return ps;
        const [np, ...remains] = range.filter((r) => {
            __count++;
            return r % p;
        });
        ps.push(np);
        return sol(remains, n, np, ps);
    }

    return n => sol(_.range(2, n + 1), n).length;
})();

// const sol = (function() {
//     const isPrime = n =>
//         _.go(
//             n,
//             n => _.range(2, n),
//             _.reject((i) => {
//                 __count++;
//                 return n % i;
//             }),
//             _.size,
//             toBool
//         );

// }());

console.log(eratos(1000), __count);
