const assert = require('chai').assert;
const { sayHello, addNumber } = require('../app');

// Results
const sayHelloResult = sayHello();
const addnumberResult = addNumber(5, 5);

describe('App', () => {
    describe('sayHello', () => {
        it('app should return hello', () => {
            assert.equal(sayHelloResult, 'hello');
        });

        it('sayHello shold return type string', () => {
            assert.typeOf(sayHelloResult, 'string');
        });
    });

    describe('addNumber', () => {
        it('addNumber should be above 5', () => {
            assert.isAbove(addnumberResult, 5);
        });

        it('addNumbers should return type number', () => {
            assert.typeOf(addnumberResult, 'number');
        });
    });
});
