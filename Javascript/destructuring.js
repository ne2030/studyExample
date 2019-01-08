// const [a, b] = [1, 2];
// const { c, d } = { c: 10, d: 20 };

// const obj = {};
// const arr = [1, 2, 3, 4, 5];

// const [obj.a, obj.b, obj.c] = arr;

// console.log(obj);

// performance test

const obj = {};

const a = 'str';
const b = { a: 1, b: 2, c: 3, d: 4, e: 5 };
const c = function () {
    return 5;
};

for (let i = 0; i < 100; i++) {
    obj['a' + i] = a;
    obj['b' + i] = b;
    obj['c' + i] = c;
}

// es6 - destructuring
// results - 1,760,577 (ops / sec)
// ±0.74%
// 6% slower

// es5 - obj assign
// results - 1,866,435
// ±0.53%
// fastest

// 객체가 저렇게 까지 커질일은 없기 때문에, 성능 차이는 거의 없다고 봐도 무방하며, 굉장히 빠르다.

{
    const { a0, a1, a2, b0, b1, b2 } = obj;
}
{
    const { a0, b1, b2 } = obj;
}
{
    const { a50, a51, a52, c50, c51, c52 } = obj;
}
{
    const { a0, a1, a2, b0, b1, b2 } = obj;
}
{
    const { a0, b1, b2 } = obj;
}
{
    const { a50, a51, a52, c50, c51, c52 } = obj;
}
{
    const { a0, a1, a2, b0, b1, b2 } = obj;
}
{
    const { a0, b1, b2 } = obj;
}
{
    const { a50, a51, a52, c50, c51, c52 } = obj;
}
{
    const { a0, a1, a2, b0, b1, b2 } = obj;
}
{
    const { a0, b1, b2 } = obj;
}
{
    const { a50, a51, a52, c50, c51, c52 } = obj;
}
{
    const { a0, a1, a2, b0, b1, b2 } = obj;
}
{
    const { a0, b1, b2 } = obj;
}
{
    const { a50, a51, a52, c50, c51, c52 } = obj;
}
{
    const { a0, a1, a2, b0, b1, b2 } = obj;
}
{
    const { a0, b1, b2 } = obj;
}
{
    const { a50, a51, a52, c50, c51, c52 } = obj;
}
