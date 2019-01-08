const { default: produce } = require('immer');
const t = require('../testModule/testFunctions');

const baseState = {
    tests: [
        {
            order: 0,
            name: 'no change'
        },
        {
            order: 1,
            name: 'change all'
        },
        {
            order: 2,
            name: 'change part'
        },
        {
            order: 3,
            name: 'performance test'
        }
    ]
};

describe('no change', () => {
    it('no return', () => {
        const newState = produce(baseState, (draft) => {});
        t.equal(newState, baseState);
    });

    it('with return', () => {
        const newState = produce(baseState, draft => draft);
        t.equal(newState, baseState);
    });
});

describe('all change', () => {
    it('empty object', () => {
        const newState = produce(baseState, (draft) => {
            return {};
        });
        t.notEqual(newState, baseState);
    });

    it('some property', () => {``
        const newState = produce(baseState, (draft) => {
            return {
                a: 'b'
            };
        });
        t.notEqual(newState, baseState);
    });
});

describe('part change', () => {
    it('one depth object', () => {
        const newState = produce(baseState, (draft) => {
            draft.new = true;
        });
        t.notEqual(newState, baseState);
    });

    it('deep property change', () => {
        const newState = produce(baseState, (draft) => {
            draft.tests.push({ order: 4, name: 'new one' });
        });

        t.notEqual(newState, baseState);
    });
});

describe('push item but object element reference don\'t change', () => {
    it('array with objects', () => {
        const newTests = produce(baseState.tests, (draft) => {
            draft.push({ order: 4, name: 'new one' });
        });

        t.equal(newTests[0], baseState.tests[0]);
    });
});
