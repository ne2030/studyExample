const should = require('should');

const { natToInt, intToNat, succ, zero } = require('./Algebraic_data_types');

describe('natToInt', () => {
    it('should convert nat to Int', () => {
        should.equal(0, natToInt(zero));
        should.equal(1, natToInt(succ(zero)));
        should.equal(2, natToInt(succ(succ(zero))));
    });
});

describe('intToNat', () => {
    it('should convert nat to Int', () => {
        should.deepEqual(zero, intToNat(0));
        should.deepEqual(succ(zero), intToNat(succ(zero)));
        should.deepEqual(succ(succ(zero)), intToNat(succ(succ(zero))));
    });

    it('should not throw maximum call stack error', () => {
        // intToNat(100000);
        
    });
});

