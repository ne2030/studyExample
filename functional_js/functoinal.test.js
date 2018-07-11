const expect = require('chai').expect;
const _ = require('./_.js');

const arr = [1, 2, 3, 4, 5];
const objArr = [
    { id: 1, name: 'ryan', age: 23 }, { id: 2, name: 'john', age: 28 }, { id: 3, name: 'henry', age: 26 },
];
const add = (a, b) => a + b;

describe('Functional programming', () => {
    /*
    * filter
    */
    describe('Filter', () => {
        it('filter item of which age is under 25 - two arguments', () => {
            console.log(_.filter(objArr, item => item.age < 25));
            expect(_.filter(objArr, item => item.age < 25)).to.deep.equal([{ id: 1, name: 'ryan', age: 23 }]);
        });

        it('filter item of which age is under 25 - currying', () => {
            expect(_.filter(item => item.age < 25)(objArr)).to.deep.equal([{ id: 1, name: 'ryan', age: 23 }]);
        });
    });

    /*
    * map
    */
    describe('Map', () => {
        it('map each item double', () => {
            expect(_.map(arr, item => item * 2)).to.deep.equal([2, 4, 6, 8, 10]);
        });

        it('map each item double - curring', () => {
            expect(_.map(item => item * 2)(arr)).to.deep.equal([2, 4, 6, 8, 10]);
        });

        it('map each item return age', () => {
            expect(_.map(objArr, item => item.age)).to.deep.equal([23, 28, 26]);
        });

        it('map each item return age - currying', () => {
            expect(_.map(item => item.age)(objArr)).to.deep.equal([23, 28, 26]);
        });
    });

    /*
    * each
    */
    describe('Each', () => {
        it('iterate each item', () => {
            const result = [];
            _.each(arr, (item, idx) => { result[idx] = item; });
            expect(result).to.deep.equal([1, 2, 3, 4, 5]);
        });

        it('iterate each item\'s index - currying', () => {
            const result = [];
            _.each((item, idx) => { result[idx] = item; })(arr);
            expect(result).to.deep.equal([1, 2, 3, 4, 5]);
        });
    });

    /*
    * sort
    */
    describe('Sort', () => {
        it('arr sort should ordered in descendence list', () => {
            expect(_.sort((a, b) => a > b)([3, 2, 5, 1, 4])).to.deep.equal(arr);
        });

        it('arr sort should ordered in descendence list - currying', () => {
            expect(_.sort([3, 2, 5, 1, 4], (a, b) => a > b)).to.deep.equal(arr);
        });

        it('arr sort should ordered in item\'s age descendence list', () => {
            const result = _.sort(objArr, (a, b) => a.age > b.age);
            const expected = [
                { id: 1, name: 'ryan', age: 23 }, { id: 3, name: 'henry', age: 26 }, { id: 2, name: 'john', age: 28 },
            ];
            expect(result).to.deep.equal(expected);
        });
    });

    /*
    * reduce
    */
    describe('Reduce', () => {
        it('reduce - add all array item with initial value', () => {
            expect(_.reduce(arr, add, 5)).to.equal(20);
        });

        it('reduce - add all array item with inital value - currying', () => {
            expect(_.reduce(add, 5)(arr)).to.equal(20);
        });

        it('reduce - add all array item', () => {
            expect(_.reduce(arr, add)).to.equal(15);
        });

        it('reduce - add all array item - currying', () => {
            expect(_.reduce(add)(arr)).to.equal(15);
        });
    });
});
