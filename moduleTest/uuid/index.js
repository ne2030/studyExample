const random = require('randomstring');
const md5 = require('md5');

const expire = '1' + new Date().getTime();
const id = expire + random.generate(10);
console.log(md5(id));
