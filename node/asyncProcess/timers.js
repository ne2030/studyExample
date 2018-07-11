const fs = require('fs');

// timeout_vs_immediate.js

// setTimeout(() => {
//   console.log('timeout');
// }, 0);
//
// setImmediate(() => {
//   console.log('immediate');
// });

// Reference: "https://nodejs.org/ko/docs/guides/event-loop-timers-and-nexttick/"

/*
*
* Poll - 설명
*
*/
// Q1. 1 cycle 에 1 task 가 실행됨 / 1 cycle 안의 check 단계에서 setImmediate 가 실행됨
// 즉, 1개의 task 가 끝나고 나면 setImmediate 가 실행될 것임, 다른 콜백 들이 얼마나 queue 에 들어있던 간에

// fs.readFile('test.txt', function() {
//     console.log('read 1');
// });
//
// fs.readFile('test.txt', function() {
//     console.log('read 2');
// });
//
// fs.readFile('test.txt', function() {
//     console.log('read 3');
// });
//
// setImmediate(() => { console.log('immediate 1'); });
//
// process.nextTick(() => { console.log('next Tick 1')});
//
// // 1.5 초 정도 걸리는 sync work
// var count = 0;
// console.time('while');
// while (count < 1000000000) {
//     if(count === 999999999) {
//         console.log('sync work');
//         console.timeEnd('while');
//     }
//     count++;
// }

// test

// const EventEmitter = require('events');
// const util = require('util');
//
// function MyEmitter() {
//   EventEmitter.call(this);
//
//   // 핸들러가 할당되면 이벤트를 발생시키려고 nextTick을 사용합니다.
//   setImmediate(() => {
//       this.emit('event');
//   });
// }
// util.inherits(MyEmitter, EventEmitter);
//
// const myEmitter = new MyEmitter();
// myEmitter.on('event', () => {
//   console.log('an event occurred!');
// });
