// About Event loop & call stack, queue, main thread

// var fs = require('fs');

/*
**
** 1. 비동기 동작 테스트
** 결과: sync 동작이 모두 완료되고 난 후, 비동기 콘솔들이 찍힘, 그러나 처리 자체는 async 요청 받자마자 진행
** 지나가면서 sync 는 실행을 하고, setTimeout 은 기다리기 시작, 그리고 메세지 큐에 콜백을 넣기 전에 sync 들을 모두 넣음
*/

/*

// async test
console.log('script start');
a = new Date();
console.time('async 1 end');
console.time('async 2 end');
console.time('async 3 end');

// 5sec async work
setTimeout(() => {
  console.log('async 1');
  console.timeEnd('async 1 end');
  b = new Date();
  console.log('time is: ' + (b - a));
}, 5000);

// 1sec async work
setTimeout(() => {
  console.log('async 2');
  console.timeEnd('async 2 end');
}, 1000);

// 3sec async work
setTimeout(() => {
  console.log('async 3');
  console.timeEnd('async 3 end');
}, 3000);

// sync work (taking more than 5 sec)
console.log('loop start');
var count=0;
while(count < 10000000000) {
  count++;
}


console.log('loop end');
console.log('script end');

*/


/*
**
** 2. 그렇다면 비동기 콜백을 메세지 큐에 넣는 시간 자체가 sync 처리 도중에 이루어 질 수 있나?
** while 문 다음에 sync 처리를 하나 더 넣을 경우, while 이 돌아가는 도중에 async 처리는 끝나고, 이벤트를 발생시킬 것
** 추측:
    1) 그 다음 sync 가 처리되기 전에 async 콜백을 실행한다
    2) 이벤트 발생이 while 도중이라 할지라도 메세지 큐에
    넣는 것은 while 문이 다 끝나고 일 것이다. 그렇다면 sync vs async 등록의 우선순위에 따라, 혹은 랜덤으로 등록이 되는 것인가?
    만약 랜덤이라면 그 다음 sync 요청이 있을 때에도 계속해서 랜덤으로 async 와 sync 의 등록을 결정짓는 것인가?
    우선순위라면 아마도 sync 가 가지고 있을 것 같긴 함

** 결과: 우선순위이고 자시고, 그냥 sync 처리가 끝나고 비동기 콜백들이 처리되는 것으로 보임, 우선순위의 문제였다면
sync console 이 찍히고 나서라도 async console 이 찍혔어야 하는데, 그것도 아니고 다음 sync 가 실행되고 나서 처리
*/

/*

console.log('test 2 start');
console.time('async');

// 실행부터 1초 후에 메세지 큐에 들어가는 async 처리
setTimeout(() => {
  console.log('async callback executed');
  console.timeEnd('async');
}, 1000)

// 1초 이상 걸리는 sync 처리
let count = 0;
while(count < 10000000000) {
  count++
}

// 과연 이 sync 처리는 sync 다음에 바로 될 것인가, 혹은 async 를 처리한 다음에 될 것인가
console.log('sync message registered');

count = 0;
while(count < 10000000000) {
  count++
}

*/

/*
**
** 3. 그렇다면 어떤 처리 범주가 있나? 전역 범위말고 특정 함수 내에서 실행되도록 스코프를 구성해 보자
** 추측:
    혹시라도 함수 내에 있다면 async 처리를 함수 내부의 sync 처리가 끝난 후에, 메세지 큐에 넣어 줄 수도 있지 않나..?
    안그러면 sync 처리는 모든 로직 상에서 처리하고 나머지 async 를 처리한다 라고 하면 너무 ... 그렇지 않나
    근데 하긴 그럴 수도 있겠네..

** 결과: 그냥 sync 처리 다 되고 나서 async 처리
*/

/*

function first() {
  console.log('first start');
  setTimeout(() => {
    console.log('firts async finished');
  }, 1000);
  let count = 0;
  while (count < 10000000000) {
    count++
  }
  console.log('first sync registered');
}

function second() {
  console.log('secondd start');
  setTimeout(() => {
    console.log('second async finished');
  }, 1000);
  let count = 0;
  while (count < 10000000000) {
    count++
  }
  console.log('second sync registered');
}

first();
second();

*/

// 그러면 sync 는 전부 미리 queue 에 등록이 되어 있는 것인가..? => queue 가 아니라 익명함수 위에서 스택으로 돌아간다.
// 메인 루프이자 싱글 쓰레드의 본체를 stack 이라고 보면 될 것 같고, 나머지 async 는 stack 에 가자마자 비워지고
// web api 던 node js 이던 런타임의 비동기 쓰레드 처리를 통해서 진행된 다음, 다 된 순서대로 event queue 에 들어가서
// 처리된다.

/*
**
** 4. 위에서는 setTimeout 이 비동기 처리 예로 사용되고 있는데, console 을 찍는 것 자체는 콜백의 역할, 즉
  콜백이 언제 등록되냐의 문제고, 비동기 처리 자체는 처리가 된다는 것
** 추측:
    혹시라도 함수 내에 있다면 async 처리를 함수 내부의 sync 처리가 끝난 후에, 메세지 큐에 넣어 줄 수도 있지 않나..?
    안그러면 sync 처리는 모든 로직 상에서 처리하고 나머지 async 를 처리한다 라고 하면 너무 ... 그렇지 않나
    근데 하긴 그럴 수도 있겠네..

** 결과: 그냥 sync 처리 다 되고 나서 async 처리
*/

/*
// 1초 후 콜백을 실행하라는 비동기 처리
setTimeout(function() {
    console.log('async');
}, 1000);

// 10초 정도가 걸리는 동기 처리
var count = 0;
while (count < 10000000000) {
    if(count == 9999999999) { console.log('last');}
    count++;
}

// 일반적인 동기 처리
console.log('sync finish');
*/


/*
**
** 5. process.nextTick 관련
** 추측: MicroTask 로 분류, macro 보다 빨리 실행
** 결과:
*/
//
// function foo() {
//     console.log(1);
// }
//
// console.log(2);
// console.log(3);
// setTimeout(() => {console.log(4);}, 0)
//
// var count = 0;
// while (count < 2000000000) {
//     if(count == 1999999999) {
//         console.log('last');
//         process.nextTick(foo);
//     }
//     count++;
// }

/*
**
** 6. 결과 추론
** 결과:
*/
//
// console.log('script start')
//
// const interval = setInterval(() => {
//   console.log('setInterval')
// }, 0)
//
// setTimeout(() => {
//   console.log('setTimeout 1')
//   process.nextTick(() => {
//     console.log('nextTick 3')
//     process.nextTick(() => {
//       console.log('nextTick 4')
//       setTimeout(() => {
//         console.log('setTimeout 2')
//         process.nextTick(() => {
//           console.log('nextTick 5')
//           process.nextTick(() => {
//             console.log('nextTick 6')
//             clearInterval(interval)
//           })
//         })
//       }, 0)
//     })
//   })
// })
//
// process.nextTick(() => {
//   console.log('nextTick 1')
//   process.nextTick(() => {
//     console.log('nextTick 2')
//   })
// })

/*
**
** 7. network IO 도 macrotask 인가?
** 맞을듯, micro 일 필요가..?
** 결과: nextwork 는 promise base 였다고 한다...난 왜그럴까...
*/

/*
**
** 8. 콜백, 프로미스의 변수 범위
** 갑자기 헷갈려서... 그냥 클로져로 작동할 것임
** 결과: 당연쓰...ㅋㅋㅋㅋ 그런데 저번에 프로미스는 안됬던거 같은 이상한 기분은 뭐지
** + promise chain 에서는 연결 안됨
** + 덤으로 알게된 건데, 프로미스 에러 처리에서 then 의 두번째 인자로 받는 에러처리와, catch 로 받는 에러처리가 다름;;
** 두번째 인자로 받는 에러처리는 프로미스 내부 에러만 캐치하고, catch 는 프로미스 다음 콜백의 에러까지 캐치해줌
*/

// fs.readFile('io', 'utf8', function(err, data){
//     var hi = data;
//     fs.readFile('io', 'utf8', function(err, data) {
//         console.log(hi);
//     });
// });

// function async () {
//     var foo = 10;
//     return new Promise(function(resolve, reject) {
//         resolve('done');
//     });
// }
//
// (function() {
//     var bar = 20;
//     async().then(function(data){
//         console.log(foo);
//         console.log(bar);
//     }).catch(function(err) { console.log(err)});
// })();

/*
**
** 8. 프로미스 가독성?
** 갑자기 멘붕, 뭐냐 왜 더 안좋은거 같지
** 결과:
**
*/

// 한개짜리 뎁스
// asyncFunc(param1, function(err, data) {
//     logic();
// });
//
// asyncFunc1(param1)
//     .then(function(err, data){
//         logic();
//     });
//
// asyncFunc(param1, function(err, data) {
//     asyncFunc1(param2, function(err, data) {
//         asyncFunc2(param3, function(err, data) {
//             logic();
//         });
//     });
// });
//
// asyncFunc(param1)
//     .then(function() {
//         asyncFunc2()
//             .then(function() {
//                 asyncFunc3()
//                     .then(function() {
//                         logic();
//                     });
//             });
//     });
//
// asyncFunc(param1)
//     .then(function() {
//         return asyncFunc2()
//     }).then(function() {
//         return asyncFunc3()
//     }).then(function() {
//         logic();
//     });

// asyncFunc(param1)
//     .then(function() {
//         syncLogic()
//         return Promise.all([
//             asyncFunc2(),
//             asyncFunc3()
//         ])
//     }).then(function() {
//         return asyncFunc3()
//     }).then(function() {
//         logic();
//     });

/*
**
** 9. 프로미스 가독성 체인
** return promise 해줬을 때, 프로미스 자체가 result 값으로 넘어가면 어떡하지
** 결과: 는 아님, then이 앞 함수의 return 을 의식하는게 아니라, promise 의 resolve 를 인식하는 것으로 보임
** 예외는 그냥 return 이 올때도 값으로 받아준다는 것, 그런데 이런 방법은 굳이 필요가 없지
*/

function asyncFunc(num) {
    return new Promise((resolve) => {
        resolve('done' + num);
    });
}

asyncFunc(0)
    .then((data) => {
        console.log(data);
        return asyncFunc(1);
    })
    .then((data) => {
        console.log(data);
        return asyncFunc(2);
    })
    .then((data) => {
        console.log(data);
        return 'finish';
    })
    .then((data) => {
        console.log(data);
    });
