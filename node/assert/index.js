const assert = require('assert');
let a, b, c, d, e, f, g;

/*
* 배열 비교
*/

a = [1, 2, 3];
b = [1, 2, 3];

// assert.equal(a, b); // Error
assert.deepEqual(a, b);
assert.deepStrictEqual(a, b);

// --> 객체 비교는 deepEqual 로!

/*
* 객체 비교
* deepEqual 은 원시 타입 비교시에는 강제로 coercing(형변환) 하여 비교
*/
a = { a: { b: 1 } };
b = { a: { b: 1 } };
c = { a: { b: '1' } };
assert.deepEqual(a, b);
assert.deepEqual(a, c);
assert.deepStrictEqual(a, b);
// assert.deepStrictEqual(a, c); // Error


/*
* 원시값 비교
* equal 은 == , strictEqual 은 ===
*/

assert.equal(1, '1');
// assert.strictEqual(1, '1'); // Error
assert.deepEqual(1, '1');
// assert.deepStrictEqual(1, '1'); //Error
