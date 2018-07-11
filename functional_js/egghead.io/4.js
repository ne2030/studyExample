// const _ = require('partial-js');

const Right = x =>
({
    chain: f => f(x),
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    inspect: () => `Right(${x})`,
});

const Left = x =>
({
    chain: f => Left(x),
    map: f => Left(x),
    fold: (f, g) => f(x),
    inspect: () => `LEFT(${x})`,
});

const fs = require('fs');

// const getPort = () => {
//     try {
//         const str = fs.readFileSync('test.json');
//         const config = JSON.parse(str);
//         return config.port;
//     } catch (e) {
//         console.log(e);
//         return 3000;
//     }
// };

const tryCatch = (f) => {
    try {
        return Right(f());
    } catch (e) {
        return Left(e);
    }
};

const getPort = () =>
    tryCatch(() => fs.readFileSync('test.json'))
    .chain(c => tryCatch(() => JSON.parse(c)))
    .chain(c => (c.port ? Right(c.port) : Left(c)))
    .fold(e => 3000,
        p => p);

const result = getPort();

console.log('port:: ', result);
