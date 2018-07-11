const _ = require('partial-js');
const assert = require('chai').assert;

const Box = (...x) => ({
    map: f => Box(f(...x)),
    fold: f => f(...x),
    inspect: () => `Box(${[...x]})`,
});

// 명령형 기반 예시

// const moneyToFloat = str =>
//     parseFloat(str.replace(/\$/g, ''));

// const percentToFloat = (str) => {
//     const replaced = str.replace(/%/g, '');
//     const number = parseFloat(replaced);
//     return number * 0.01;
// };

// const applyDiscount = (price, discount) => {
//     const cost = moneyToFloat(price);
//     const savings = percentToFloat(discount);
//     return cost - (cost * savings);
// };

// const result = applyDiscount('$5.00', '20%');
// console.log(result);

// 박스를 사용한 예시
const moneyToFloat = str =>
    Box(str)
    .map(s => s.replace(/\$/g, ''))
    .map(r => parseFloat(r));

const percentToFloat = str =>
    Box(str.replace(/%/g, ''))
    .map(replaced => parseFloat(replaced))
    .map(number => number * 0.01);

const applyDiscount = (price, discount) =>
    moneyToFloat(price)
    .fold(cost =>
        percentToFloat(discount)
            .fold(savings => cost - (cost * savings)));

describe('Lesson 2', () => {
    describe('moenyToFloat', () => {
        const result = moneyToFloat('$5.00').fold(_.identity);
        it('money to float', () => {
            assert.equal(result, 5);
        });

        it('shold return type number', () => {
            assert.typeOf(result, 'number');
        });
    });

    describe('parcentToFloat', () => {
        const result = percentToFloat('20%').fold(_.identity);
        _.hi(result);
        it('percent to float', () => {
            assert.equal(result, 0.2);
        });

        it('should return type number', () => {
            assert.typeOf(result, 'number');
        });
    });

    describe('applyDiscount', () => {
        const result = applyDiscount('$5.00', '20%');
        it('apply discount', () => {
            assert.equal(result, 4);
        });

        it('should return type number', () => {
            assert.typeOf(result, 'number');
        });
    });
});
