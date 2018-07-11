const iterableString = 'iterableString';

const keyObj1 = { a: 10 };
const keyObj2 = { b: 20 };

const iterableArray = [[keyObj1, 10], [keyObj2, 20]];

console.log(
    new Map(iterableArray).get(keyObj1)
);
