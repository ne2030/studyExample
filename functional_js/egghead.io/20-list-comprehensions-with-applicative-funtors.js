const { List } = require('immutable-ext');

/*
 -- general loops
for (x in xs) {
    for (y in ys) {
        for (z in zs) {

        }
    }
}
*/

// using applicative functors
const merch = () =>
    List.of(x => y => z => `${x}-${y}-${z}`)
    .ap(List(['tShirt', 'sweater']))
    .ap(List(['large', 'medium', 'small']))
    .ap(List(['black', 'white']));

const res = merch();

console.log(res);
