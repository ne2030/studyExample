// semi group (A semigroup is a type with a concat method)
// ex, string, array

const a = 'a'.concat('b').concat('c');

// associativity (결합법칙)
const b = 'a'.concat('b').concat('c') === 'a'.concat('b'.concat('c'));

const Sum = x =>
({
    x,
    concat: ({ x: y }) => {
        Sum(x + y);
    },
    inspect: `Sum(${x})`,
});

// const res = Sum(1).concat(Sum(2));
// console.log(res.inspect());

const All = x =>
({
    x,
    concat: ({ x: y }) =>
        All(x && y),
    inspect: () =>
        `All(${x})`,
});

true && false // false (also concatnation)
true && true // true

// const res = All(true).concat(All(false)); // false
// console.log('result: ', res);

const First = x =>
({
    x,
    concat: () =>
        First(x),
    inspect: () =>
        `First(${x})`,
});

const res = First('blah').concat(First('ice cream')).concat(First('meta programming'));
console.log(res);
