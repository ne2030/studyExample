const { Right, Left } = require('./monoid');
const Either = {
    of: (x) => Right(x),
    map: f => Right(f(x))
};

const add = x => y => x + y;

const Box = x =>
    ({
        ap: b2 => b2.map(x),
        map: f => Box(f(x)),
        inspect: () => `Box(${x})`
    });

const liftA2 = (f, fx, fy) =>
    fx.map(f).ap(fy);

// const res = Box(add).ap(Box(2)).ap(Box(2));
// const res = liftA2(add, Box(2), Box(4));

// F = Any Functor
// F(x).map(f) === F(f).ap(F(x));

// console.log(res);

const $ = selector =>
    Either.of({ selector, height: 10 })

const getScreenSize = screen => head => foot =>
    screen - (head.height + foot.height)

// 첫번째 방법

// $('header').chain(head =>
//     $('footer').map(footer =>
//         getScreenSize(800, head, footer)));

// 두번째 방법

// const res = Either.of(getScreenSize(800))
//             .ap($('header'))
//             .ap($('footer'));

// 세번째 방법 - 함수 이용해서 동시에

const res = liftA2(getScreenSize(800), $('header'), $('footer'));

console.log(res);

