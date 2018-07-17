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

    // with return
    const newState2 = produce(baseState, (draft) => {});
    test(newState2, baseState);
});

// change all
{
    // const test = compare('change all');

    const newState = produce(baseState, draft => ({
        a: 1
    }));

    test(newState, baseState);
    // console.log(newState, baseState);
}

{
    // const
}
