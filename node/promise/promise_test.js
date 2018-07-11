// const fs = require('fs');
// const _Promise = require('./_promise');
//
// function readText(title, file) {
//     return new _Promise(function (resolve, reject) {
//         console.log('promise start!!');
//         const textData = {
//             title,
//         };
//         if (title.length < 10) reject('text title is too short!! please enter longer than 10');
//         fs.readFile(file, 'utf8', function(err, data) {
//             console.log('read file fin');
//             if (err) reject(err);
//             textData.data = data;
//             resolve(textData);
//         });
//     });
// }
//
// console.log(1);
//
// readText('sample text book', 'sample.txt')
//     .then((text) => {
//         console.log('title:: ', text.title);
//         console.log('data:: ', text.data);
//     })
//     .catch((err) => {
//         const message = err.message ? err.message : err;
//         console.log('an error occured!!:: ', message);
//     });
//
// console.log(2);

// function testAsync() {
//     return new Promise((resolve) => {
//         setTimeout(() => resolve(30), 100);
//     });
// }
//
// function test() {
//     return testAsync().then(result => result + 10);
// }
//
// test()
//     .then(a => console.log(a));
