const expect = require('chai').expect;

// mock datas
const obj = { a: 1 };
const obj2 = { a: 1 };
const obj3 = Object.create(obj2);

const add = (a, b) => a + b;

describe('Expect', () => {
    it('equal test - 10 = 10', () => {
        expect(10).to.equal(10);
    });

    it('deep equal test in prototype chain', () => {
        expect(obj3).to.deep.equal(obj);
    });

    it('not - result != null', () => {
        expect(add(5, 5)).to.not.equal(null);
    });

    it('not chainable - result !== null && result !== undefined', () => {
        expect(add(5, 5)).to.not.equal(null).to.not.equal(undefined);
    });
});
