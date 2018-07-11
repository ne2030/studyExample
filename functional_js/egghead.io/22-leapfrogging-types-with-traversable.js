const fs = require('fs');
const Task = require('data.task');
const futurize = require('futurize').futurize(Task);
const { List } = require('immutable-ext');

const readFile = futurize(fs.readFile);


// -- 기본적인 방식

// const files = ['1.js', '3.js'];

// const res = files.map(fn => readFile(fn, 'utf8'));
// list of tasks
// [Task] => Task([])


// -- Traverse 를 이용한 방식
const files = List(['1.js', '2.js']);
const res = files.traverse(Task.of, fn => readFile(fn, 'utf8'));

