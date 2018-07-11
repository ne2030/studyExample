const { Left, Right } = require('./monoid');

const Box = x =>
({
    x,
    
    of: a => Box(a),
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
});

// functors should follow a few laws
// functor has "map" method

// 1. fx.map(f).map(g) === fx.map(x => g(f(x)))
// 아마도 결합 법칙 - (a * b) * c = a * (b * c), composition

const res1 = Box('squirrels')
            .map(s => s.substr(5))
            .map(s => s.toUpperCase());

const res2 = Box('squirrels')
            .map(s => s.substr(5).toUpperCase());

const res3 = Left('squirrels')
.map(s => s.substr(5))
.map(s => s.toUpperCase());

const res4 = Left('squirrels')
            .map(s => s.substr(5).toUpperCase());

console.log(res1, res2);

console.log(res3, res4);

// 2. fx.map(id) === id(fx)
// 이게 무슨 법칙인지 모르겠다. identity ?

const id = x => x;

const res5 = Box('crayons').map(id);

const res6 = id(Box('crayons'));

console.log(res5, res6);
