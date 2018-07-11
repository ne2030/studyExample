
let fs = require('fs'),
    tfy = require('thunkify'),
    co = require('co');

co(function* () {
    const test = require('./parallel.js');
    const test1 = require('./test1.js');

    const [res, res1] = yield [test, test1];
    console.log('first' + res);
    console.log('second' + res1);
});
