let fs = require('fs'),
    tfy = require('thunkify'),
    co = require('co');

const read = tfy(fs.readFile);

module.exports = co(function* () {
    const res = yield read('./io', 'utf8');
    console.log('first io');
    return res;
});
