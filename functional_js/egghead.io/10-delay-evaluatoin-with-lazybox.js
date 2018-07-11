const fs = require('fs');

const LazyBox = g =>
({
    fold: f => f(g()),
    map: f => LazyBox(r => f(g(r))),
    inspect: () => `LazyBox`
});

const result = LazyBox(() => '   64 ')
                .map(abba => abba.trim())
                .map(trimmed => Number(trimmed))
                .map(number => number + 1)
                .map(x => String.fromCharCode(x))
                .fold(x => x.toLowerCase());

console.log(result);

// 약간 방식이 다르긴 하나, lazy 를 사용한 실행의 지연이라는 점에서 응용이라고 봐야 할 듯
const lazyPractice = () => {
    const LazyBox = g =>
    ({
        fold: r => g(r),
        map: f => LazyBox(r => f(g(r))),
        inspect: () => `LazyBox`
    });

    const FakePromise = function (f) {
        let fnBox = LazyBox(a => a);
        this.then = (g) => { fnBox = fnBox.map(g); };
        const resolve = (r) => {
            process.nextTick(r => fnBox.fold(r), r);
        };
        const reject = () => {};
        f(resolve, reject);
    };
    
    console.log('start');
    
    new FakePromise((resolve, reject) => {
        fs.readFile('test.json', 'utf8', (err, result) => {
            resolve(result);
        });
    })
        .then((a) => {
            console.log('success!', a);
        });
    
    console.log('end');
};
