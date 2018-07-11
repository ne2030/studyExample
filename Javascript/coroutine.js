// reference:: http://rapapa.net/?p=2704
// javascript 에서는 성립 안함.. ㅎㅎ

function f(from) {
    for(let i = 0; i < 100000; i++) {
        console.log(from, ':', i);
    }
}

function main() {
    f('direct');

    f('coroutine');

    (function (msg){
        console.log(msg);
    }('going'));

    const input = 'done';
    console.log(input);
}

// main();

// js concurrency 예제

function asyncWork(delay, msg) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(msg);
        }, delay);
    });
}

function js() {
    asyncWork(1000, 'act1');

    asyncWork(500, 'act2');

    console.log('act3');
}

js();
