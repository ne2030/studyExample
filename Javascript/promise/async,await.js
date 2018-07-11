function testAsync() {
    return new Promise((resolve) => {
        resolve(1);
    });
}

function testErrorAsync() {
    return new Promise((resolve, reject) => {
        reject('error test');
    });
}
//
// const test = async () => {
//     const b = await Promise.all([testAsync(), testAsync()]);
//     return b;
// };
//
// const log = (v) => {
//     console.log(v);
//     return v;
// };
//
// let arr = [];
//
// // 리턴값 바로 사용 가능
// (async () => {
//     arr = arr.concat(await test());
//     log(arr);
// })();
//
// (async function() {
//     null[4];
// })();
//
// log('a');

// const tfy = require('thunkify');
// const fs = require('fs');
// const util = require('util');
//
// // const readFile = tfy(fs.readFile);
// const readFile = util.promisify(fs.readFile);
//
// (async () => {
//     const result = await readFile('hoisting.js', 'utf8');
//     console.log(result);
// })();

/*
* await 문 리턴
* --> 필요없음, 리턴시에 자동으로 await 로 감싸진 것이 리턴됨
*/

const returnTest = async () => {
    return testAsync();
};

/*
* await 문 리턴
*/

try {
    const errorHandlingTest = async () => {
        await testErrorAsync();
        console.log('finish!!');
    };
    errorHandlingTest();
} catch (err) {
    console.log('err');
}
