'use strict';

let co = require('co'),
    tfy = require('thunkify'),
    fs = require('fs');

/*
*
* -- 1 --
* Description: 콜백 만들어서 테스트 (일반 콜백 함수)
* 결론: yield 뜻처럼, 실행을 통해 생산하는, 다시 말하면 리턴하는 값이 array, object, promise, generator 으로 한정됨
*/


// 일반 콜백 함수 리턴
// function minwon (e1, e2, callback) {
//     try { e1 + e2; }
//     catch (e) { var err = e; }
//     return callback(err, e1+e2);
// }
//
// function minwonSync (e1, e2){
//     return function(fn){
//         minwon(e1, e2, fn);
//     };
// }
//
// // array 및 object 리턴 (가능)
// co(function* () {
// try {
//     console.log('start');
//     // let arr = yield hey();
//     //
//     // function hey(){
//     //     return { id: 3 }
//     // }
//     let res = yield minwonSync(3,4);
//     console.log(res);
//     console.log('end');
// } catch (e) { console.error(e); }
// });
//
// console.log('middle')








/*
*
* -- 2 --
* Description: 콜백 만들어서 테스트 (메소드 형태)
*

function doing () {};

doing.prototype.fire = (e1, e2, e3, callback) => {
    let work = [];
    let err;
    let val = 10;
    try {
        if ((e1+e2).length > 10) { work.push(e1+e2) }
        else if ( (e2+e3).length > 5) { work.push(e3)}
        // null.length;
    }
    catch (e) { err = e; }

    return callback(err, work[0], val);
}

let shit = new doing();
// shit.fire(null, null,null, (e1,e2,e3) => console.log(e2, 'finish'));


let fire = tfy(shit.fire);
co(function*(){
try {
    let res = yield fire('fire', 'water', 'milk');
    console.log(res);
} catch (e) { console.error(e);}
}());
*/









/*
*
* -- 3 --
* Description: 순서 테스트 (yield 전까지의 로직은 비동기랑 동시에 실행이 안되겠지..?) => ㅇㅇ 그렇다


동기 로직에 yield 적용시 해당 로직 결과만 실행되고 전체 co 자체가 뻗어버림

*/
// let read = tfy(fs.readFile),
//     sto = tfy(setTimeout);
//
// co(function*(){
//     console.log(1);
//     let data = yield read('../README.md', 'utf8');
//     console.log(data, 2);
//     // let hi = yield sto(() => {console.log(3);}, 1000);
//     console.log(4);
// }());

// 왜 setTimeout 다음이 실행 안되지?






/*
*
* -- 4 --
* Description: 예제 연습 / pure Generator
* Result: generator function 은 for of 문이나 for 문에서만 작동, foreach에서는 작동 x, 함수라서 그런가
* Generator function 안에 있더라도, fn 으로 한번 더 들어가면 yield 작동 안함,
*/

// function* test1 () {
//     yield 3;
//     yield 2;
//     yield { object: 'object'};
// }
//
// for (let key of test1()){
//     console.log(key);
// }
//
//
// function* test(obj) {
//     let keys = Object.keys(obj);
//
//     yield* tt();
//     function* tt(){
//         yield keys[0];
//     }
// }
//
// const jane = { first: 'Jane', last: 'Doe' };
// for ( let key of test(jane)) {
//     console.log(key);
// }

// let read = tfy(fs.readFile);
//
// function* test() {
//     var res = yield read('io', 'utf8');
//     console.log(res);
//     return 100;
// }
//
// co(function*() {
//     console.log('start');
//     var result = yield test();
//     console.log(result);
// })

/*
*
* -- 5 --
* Description: 배열 연습 / yield 를 실행하고 나서도 그 결과 값이 왼쪽 var 로 남아있는가?
* Result: no! function 으로 표기됨
*/

/*
let read = tfy(fs.readFile);

co(function *(){
try {
  var a = read('README.md', 'utf8');
  var b = read('key.pem', 'utf8');
  let [a,b] = yield [a, b];
  console.log(a,b);
} catch (e) { console.error(e); }
}());
*/



/*
*
* -- 6 --
* Description: 일반 Generator로 비동기 처리하기
* Result:
*/

// console.log('start');
// let hi = undefined;
// function* gen(val) {
//   if (val) {
//     yield 1;
//   }
//   yield fs.readFileSync ('../README.md', 'utf8', function(res){ return 33; });
//   yield 3;
// }
//
// let general = gen();
// console.log(general.next().value);
// console.log(general.next().value);
// console.log(general.next().value);

// function test () {
//   return new Promise((resolve, reject) => {
//     fs.readFile('../README.md', 'utf8', function(err, res){
//       resolve(res);
//     });
//   });
// }
//
// test().then(function(hi) { console.log(hi); });

/*
*
* -- 7 --
* Description: Error 처리
* Result:
*/

// co(function*() {
//     let res = yield Promise.reject(new Error("i'm error"));
//     // throw new Error('sync error');
// })
// .then(data => {
//     console.log(data);
//     console.log('success');
// })
// .catch(e => {
//     console.log('hi');
//     console.log(e);
// })

/*
*
* -- 7 --
* Description: Error 처리
* Result:
*/

// function* a() {
//   yield* b();
// }
//
// function* b() {
//   yield new Promise(function(resolve, reject) {
//     setTimeout(function() {
//       resolve();
//     }, 1000);
//     throw new Error('error');
//   });
// }
//
// co(function* () {
//     yield* a();
// }).catch(e => { console.error(e.stack);})

/*
*
* -- 8 --
* Description: setTImeout 실행?
* Result: 된다!
* Reference: https://github.com/thenables/timeout-then/blob/master/index.js
*/

// co(function* () {
//     let hi;
//     yield (function timer() {
//         return new Promise(function (resolve) {
//             setTimeout(function(){
//                 hi = 100;
//                 resolve('done');
//             }, 2000)
//         });
//     })();
//
//     console.log(hi);
// });

/*
*
* -- 9 --
* Description: co.wrap 사용 (8번 예제 바꿔서 실행)
* Result: 실행 가능, co 내부에서 co 사용 가능, promise 기반이기 때문에
*/

// co(function* () {
//     let hi = yield co.wrap(function* timer() {
//         return yield new Promise(function (resolve) {
//             setTimeout(function(){
//                 // hi = 100;
//                 resolve('done');
//             }, 2000)
//         });
//     })();
//
//     console.log(hi);
// });

// co(function* () {
//     let hi;
//     hi = co.wrap(function*() {
//         let data;
//         yield setTimeout(() => {
//             data = 100;
//             console.log('fin');
//         }, 2000)
//         console.log();
//     });
//     console.log(hi);
// });

// let read = tfy(fs.readFile);

// co(function*(){
//     let data1;
//     console.log('start');
//     yield* (function*() {
//         data1 = yield read('../README.md', 'utf8');
//     })();
//     console.log(data1);
//     console.log('fin');
// }());

/*
*
* -- 10- --
* Description: yield* 로 뎁스를 들어갈 때 순서?
* Result:
* Solution:
*/
/*
function* a() {
    try {
    console.log('a');
    let res = yield Promise.resolve(3);
    return res;
} catch (e) { console.error(e.stack);}
}

function* b() {
    try {
    yield new Promise(function(resolve, reject) {
        setTimeout(function() {
            console.log('b');
            resolve('done');
        }, 1000);
        // throw new Error('error');
    });
    return 'hi';
} catch (e) { console.error(e.stack);}
}

co(function* () {
try {
    // let _a =  a();
    // let _b = b();
    let res = yield [a(), b()];
    console.log(res);
} catch (e) {
    console.error(e.stack);
}
}).catch(e => { console.error(e.stack);})
*/


/*
*
* -- 11 --
* Description: co 가 promise 를 반환하면, 그 result 값을 어떻게 전달하는지? return?
* Result: yes, return 으로 결과값 넘김
*/

// co(function* () {
//     let hi = 100;
//     return hi;
// }).then(res => {
//     console.log(res);
// });

/*
*
* -- 12 --
* Description: promise 의 처리 순서, promise 내부의 sync 처리는 언제 이루어지는가?
* Result: 놀랍게도, promise 내부의 로직은 일반 함수처럼 내부의 sync 처리는 다 끝내고 나옴
*/
//
// function test() {
//     return new Promise((resolve, reject) => {
//         // 원래는 sync 작업인데, promise 내부에 있는 경우 어디에서 돌아가는가...?
//         // 콜백처럼 여겨져서 process.nextTick 처럼 microTask 로 바로 넘어가는지?
//         // 확실히 기본 sync 처리 중간에 나올 것 같지는 않음
//
//         // => 일단 promise start 가 찍히고 시작 ㅋㅋㅋㅋㅋㅋ
//         console.log('promise start');
//         setTimeout(function() {
//             console.log('timeout!');
//             resolve();
//         }, 3000);
//     });
// }
//
// test()
//     .then(() => console.log('promise fin'));
//
// var count = 0;
// console.time('while');
// while (count < 5000000000) {
//     if(count == 4999999999) {
//         console.log('sync work');
//         console.timeEnd('while');
//     }
//     count++;
// }
//
// console.log('sync end');

/*
*
* -- 13 --
* Description: co 내부에서 yield* 를 써야 하는가?
* Result: 안써도됨
*/
//
// var read = tfy(fs.readFile);
//
// function* async1() {
//     console.log(1);
//     var res = yield read('io', 'utf8');
//     console.log(res);
//     console.log(2);
// }
//
// co(function*() {
// try {
//     console.log('start');
// 	yield async1();
//     console.log('end');
// } catch (err) {
// 	console.log(err.stack);
// }
// });

/*
*
* -- 14 --
* Description: promise chain 내에서의 스코핑? promise 앞 함수에서 var 이 뒤에 함수까지 가는지?
* Result: 변수를 못받는다..? ㅇㅇ
*/

// function asyncFunc(){
//     return new Promise(function(resolve, reject) {
//         var foo = 100;
//         bar = 50;
//         setTimeout(function(){
//             console.log('async work!');
//             resolve(foo);
//         }, 1000)
//     });
// }
// var bar;
// asyncFunc().then(function(foo) {
//     console.log(foo + '');
//     console.log(bar);
//     console.log(typeof(foo));
// });


/*
*
* -- 15 --
* Description: co 모듈 내에 forEach 같은 거를 arrow function 으로 쓰지 않으면 yield 가 전달이 안된다..?
* Result:
*/

// let read = tfy(fs.readFile);
//
// let arr = [1,2,3,4,5];
// co(function*() {
// try {
//     yield arr.forEach(function*(v, i, a) {
//         var res = yield read('io');
//         console.log(i + ' : ' + res);
//     });
// } catch (err) {
//     console.log(err.stack);
// }
// });

/*
*
* -- 16 --
* Description: generator function 의 리턴값은 전달이 안된다?
* Result: 잘만됨, 근데 eslint 에서는 왜 에러로 잡는지?
*/

// function* test() {
//     const b = yield { a: 10 };
//     return 100;
// }
//
// co(function* () {
//     const a = yield test();
//     console.log(a);
// });

/*
* -- 17 --
* Description: 안쪽 제너레이터에서 에러 발생시 어디로 뿜어지는지? 안쪽에서 에러 처리 되어 있으면 안쪽에서 잡히겠지
* Result:
*/

// function* error() {
//     throw new Error('에러다 샹샹바야');
// }
//
// function* test() {
//     try {
//         const b = yield error();
//         console.log('실행!')
//         return 100;
//     } catch (err) {
//         console.log('inner scope :: ', err);
//         return '실패했습니다.'
//     }
// }
//
// co(function* () {
//     try {
//         const a = yield test();
//         console.log(a);
//     } catch (err) {
//         console.log('co scope :: ', err)
//     }
//
// });

/*
* -- 18 --
* Description: 12번 연장선상, 안쪽 promise 가 sync로 실행된다고 할 때, micorTask 인 프로미스와 일반 macroTask 인 것의 비교
* Condition: callback queue 에 쌓일만큼 동기 작업이 길어야 함
* Result: Promise 를 생성할 때 있는 기본 작업들은 Sync 로 처리가 됨, 대신 resolve 나 reject 처리가 microTask 로 이루어져서
프로미스 체인의 진행이 비동기로 이루어 지는 것 같음
*/

// setImmediate(() => { console.log('Macro Task Fin!')});
//
// function test() {
//     return new Promise((resolve, reject) => {
//         console.log('promise start');
//         resolve();
//         // setTimeout(function() {
//         //     console.log('timeout!');
//         //     resolve();
//         // }, 300);
//     });
// }
//
// test()
//     .then(() => console.log('promise fin'));
//
// var count = 0;
// console.time('while');
// while (count < 1000000000) {
//     if(count === 999999999) {
//         console.log('sync work');
//         console.timeEnd('while');
//     }
//     count++;
// }
//
// console.log('sync end');

/*
* -- 19 --
* Description: 여러개의 promise 를 yield 할 때, 그 내부의 array 까지 yield 시키는가..?
* Result: 성공적으로 잘 나옴 -> [ 0, 1, 2, [ 10, 20 ] ]
*/

// make promise function
// function asyncFunc(a) {
//     return new Promise((resolve) => {
//         setTimeout(() => { resolve(a); }, 10);
//     });
// }
//
// co(function* () {
//     const promiseArray = [];
//     // 일반 프라미스 푸쉬
//     for(let i = 0; i < 3; i ++) {
//         promiseArray.push(asyncFunc(i));
//     }
//     promiseArray.push([
//         asyncFunc(10), asyncFunc(20)
//     ]);
//
//     const results = yield promiseArray;
//
//     console.log(results);
// });
