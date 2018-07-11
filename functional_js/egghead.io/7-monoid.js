// 항등원

// 1 + 0 = 1
// 0 + 0 = 0
// x + 0 = x

const Sum = x =>
({
    x,
    concat: ({ x: y }) =>
        Sum(x + y),
    inspect: () =>
        `Sum(${x})`,
});

Sum.empty = () => Sum(0);

// const res = Sum(1).concat(Sum.empty()).concat(Sum(4)); // 5

const All = x =>
({
    x,
    concat: ({ x: y }) =>
        All(x && y),
    inspect: () =>
        `All(${x})`,
});

All.empty = () => All(true);

const res1 = All(false).concat(All(true)).concat(All.empty());

// First can't be monoid

// first a + first empty = a
// first ? + first a = empty ?


// reduce is safe for monoids
// 항등원이 있기 때문에 none 을 넣던 빈 문자열을 넣던 상관 없음
const sum = xs =>
    xs.reduce((acc, x) => acc + x, 0);

console.log(sum([1,2,3]));

const all = xs =>
    xs.reduce((acc, x) => acc && x, true);

const first = xs =>
    xs.reduce((acc, x) => acc);

