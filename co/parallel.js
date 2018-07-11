
let fs = require('fs'),
    tfy = require('thunkify'),
    co = require('co');


// thunkify
const read = tfy(fs.readFile);

module.exports = co(function* () {
    try {
        const key = yield read('../package.json', 'utf8');
        return key;
    // let book = read('../.gitignore', 'utf8');
    // let data = read('../README.md', 'utf8');
    // [key, book, data] = yield [key, book, data]
    // console.log(key, book, data);
    } catch (err) {
        console.error(err.stack);
    }
});

// test.js
// module.exports = co.wrap(function*() {
//     yield dbSetting();
//     yield dbConnect();
//
// })


// https://medium.com/@pitzcarraldo/javascript-generators%EC%99%80-co-5316ee9266f9#.gyravvdne
