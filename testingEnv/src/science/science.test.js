const assert = require('chai').assert;
const { boil, refrigerate } = require('./science.js');


describe('Science', () => {
    describe('Boil', () => {
        it('boil water should results in steam', () => {
            assert.equal(boil('water'), 'steam');
        });

        it('boil ice should results in water', () => {
            assert.equal(boil('ice'), 'water');
        });
    });

    describe('Refrigerate', () => {
        it('refrigerate water should results in ice', () => {
            assert.equal(refrigerate('water'), 'ice');
        });

        it('refrigerate steam should results in water', () => {
            assert.equal(refrigerate('steam'), 'water');
        });
    });
});
