
// Sum
const Sum = x =>
({
    x,
    concat: ({ x: y }) => Sum(x + y),
    inspect: () => `Sum(${x})`
});

Sum.empty = () => Sum(0);

// Product
const Product = x =>
({
    x,
    concat: ({ x: y }) => Product(x * y),
    inspect: () => `Product(${x})`
});

Product.empty = () => Product(1);

// Any
const Any = x =>
({
    x,
    concat: ({ x: y }) => Any(x || y),
    inspect: () => `Any(${x})`
});

Any.empty = () => Any(false);

// All
const All = x =>
({
    x,
    concat: ({ x: y }) => All(x && y),
    inspect: () => `All(${x})`
});

Any.empty = () => Any(true);

const Max = x =>
({
    x,
    concat: ({ x: y }) => Max(x > y ? x : y),
    inspect: () => `Max(${x})`
});

Max.empty = () => Max(-Infinity);

const Min = x =>
({
    x,
    concat: ({ x: y }) => Min(x > y ? y : x),
    inspect: () => `Min(${x})`
});

Min.empty = () => Min(Infinity);

const Left = x =>
({
    fold: (f, g) => f(x),
    map: f => Left(x),
    concat: o => Left(x),
    inspect: () => `Left(${x})`
});

const Right = x =>
({
    fold: (f, g) => g(x),
    map: f => Right(f(x)),
    concat: o => o.fold(e => Left(e),
                        r => Right(x.concat(r))),
                        // x 가 결국에는 concatable 해야 하는데, 그렇다면 x 로 들어오는 것도 결국 semigroup 이어야 한다?
    inspect: () => `Right(${x})`
});

// const stats = List.of(
//     { page: 'Home', views: 40 },
//     { page: 'About', views: 10 },
//     { page: 'Blog', views: 4 });

// stats.foldMap(x =>
//     fromNullable(x.views).map(Sum), Right(Sum(0)));

const First = either =>
({
    fold: f => f(either),
    concat: o =>
        (either.isLeft ? o : First(either)),
    inspect: () => `${either}`
});

First.empty = () => First(Left());

// const find = (xs, f) =>
//     List(xs)
//     .foldMap(x =>
//         First(f(x) ? Right(x) : Left()), First.empty())
//     .fold(x => x);

// find([3, 4, 5, 6, 7], x => x > 4)
// Right(5);

const Fn = f =>
({
    fold: f,
    concat: o =>
        Fn(x => f(x).concat(o.fold(x))),
    inspect: () => `Fn(${f})`
});

// const hasVowels = x => !!x.match(/[aeiou]/ig);
// const longWord = x => x.length >= 5;

// const both = Fn(compose(All, hasVowels))
//             .concat(Fn(compose(All, longWord)));

// ['gym', 'bird', 'lilad']
//     .filter(x => both.fold(x).x);
// [lilac];

const Pair = (x, y) =>
({
    x,
    y,
    concat: ({ x: x1, y: y1 }) =>
        Pair(x.concat(x1), y.concat(y1))
});

module.exports = {
    Sum, Product, All, Any, Right, Left, First, Fn, Pair, Max, Min
};
