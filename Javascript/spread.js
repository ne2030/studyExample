// node.js 6.10.1

// 
// let {a,b,c} = {
//     a: 100,
//     b: [1,2,3,4,5],
//     c: {
//         name: 'ryan',
//         age: 23
//     }
// };
//
// console.log(a);
// console.log(b);
// console.log(c);

//

let obj = {
    a: 10,
    b: 20,
    c: 30
};

let newObj = { ...obj, d: 20, c: 40};

console.log(newObj);
