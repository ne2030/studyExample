// const encoding = require('encoding');

let str = '';

for(let i = 0; i < 10000000; i++) {
    str += 'abcdef';
}


console.log('UTF8:: string length: ', str.length, '\n');

let _str = encoding.convert(str, 'binary', 'utf8');

let buf1 = Buffer.from(str, 'utf8');

let binary = Buffer.from(str, 'binary');

let __str = binary.toString('binary');

let buf2 = Buffer.from(__str, 'utf8');

console.log(buf1.length, buf2.length);
