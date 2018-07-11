// const [a, b] = [1, 2];
// const { c, d } = { c: 10, d: 20 };

const obj = {};
const arr = [1, 2, 3, 4, 5];

const [obj.a, obj.b, obj.c] = arr;

console.log(obj);
