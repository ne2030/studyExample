/*
* Object to Array
*/

// 조건 - 복잡한 Object

const loop = 100000;
let obj = { a: 10, b: 20, c: 30, d: { e: 40, f: 60, g: { h: 70, i: 80}}};

// 1. object values

console.time('object');
for(let i = 0; i < loop; i++) {
    let arr = Object.values(obj);
}

console.timeEnd('object');

// 2. for ~ in

console.time('for');
for(let i = 0; i < loop; i++) {
    let arr = [];
    for(let key in obj) {
        arr.push(obj[key]);
    }
}
console.timeEnd('for');

/*
*   결과: 
*   object: 43.450ms
*   for: 7.722ms
*
*/
