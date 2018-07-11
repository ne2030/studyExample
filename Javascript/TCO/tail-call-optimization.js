// sum 함수

function sum(n) {
    return n ? n + sum(n - 1) : 0;
}

sum(10500); // maximum call stack size exceeded

function sum2(num) {
    return (function s(n, acc) {
        return n ? s(n - 1, acc + n) : acc;
    }(num, 0));
}

sum2(9645); // still has call stack error (tco is under progress)

// function sum3(num) {
//     return (function s(n, acc) {
//         return
//     }(num, 0));
// }
