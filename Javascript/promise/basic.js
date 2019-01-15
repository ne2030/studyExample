// error handling


// 1) error chaining?
// => most outer async fn catch error

const pError = () => Promise.reject(1);

const insideAsync = async () => {
    await pError();
    return 10;
};

const in2 = async () => {
    await insideAsync();
};

const insideSync = () => {
    pError();
};

const outerAsync = async () => {
    try {
        // const result = await in2();
        insideSync();
    } catch (e) {
        console.log(e);
    }
};

// outerAsync();

// 2) promise code excute

console.time('async');

const p = new Promise((res) => {
    console.log('before');
    setTimeout(() => {
        console.log('after');
        console.timeEnd('async');
    }, 100);
    res(5);
});

console.time('sync');

let i = 'start';
let n = 1000000;
while (n) {
    i += 'aef';
    n -= 1;
}

console.timeEnd('sync');
