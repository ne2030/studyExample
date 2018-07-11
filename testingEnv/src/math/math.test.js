const assert = require('chai').assert;
const { add, minus } = require('./math.js');


describe('Math', () => {
    describe('Add', () => {
        it('add 5 + 5 should return 10', () => {
            assert.equal(add(5, 5), 10);
        });
    });

    describe('Minus', () => {
        it('minus 10 - 5 should return 5', () => {
            assert.equal(minus(10, 5), 5);
        });
    });
});
