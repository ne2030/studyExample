const _ = require('partial-js');
// const moment = require('moment');
// // const util = require('util');

// // const log = (a) => { console.log(a); return a; };

// // const testAsyncError = async function (a) {
// //     throw new Error('hi');
// //     return a * 2;
// // };

// // const testAsync = async (a) => {
// //     return a * 10;
// // };

// // // const arr = [
// // //     {}, {}, {}
// // // ];

// // // log(_.filter(_.isEmpty)(arr));

// // const arr = ['a', 'b', 'c', 'd', 'e'];

// // log(_.partial(_.pick, _, arr)({ a: 10, b: 20, f: 30, g: 40, o: 50 }));

// // _.hi(
// //     _.contains('a')(['a'])
// // )

// const curryr = exports.curryr = f => function (a, b) {
//     return arguments.length === 2 ? f(a, b) : b => f(b, a);
// };
// const arrIncludes = curryr(_.contains);

// // console.log(
// //     arrIncludes(    ], 1)
// // );

// // _.hi(
// //     _.map([1,2,3], (a) => {
// //         if (a === 1) return 10;
// //         return new Promise((res) => {
// //             res(a * 2);
// //         });
// //     })
// // )

// // Promise.all([1, 2, 3, 4, new Promise((res) => res(5))])
//     // .then(_.hi)

// const a = moment();

// const b = a.add(1, 'days');

// console.log(a, b);

console.log(
    _.go(
        10,
        // _.pipe(
        //     a => a + 1,
        //     _.stop,
        //     a => a + 1,
        // ),
        a => a * 2,
        () => _.stop(undefined),
        console.log
    )
);
