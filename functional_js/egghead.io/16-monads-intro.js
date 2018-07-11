const Box = require('./13-functors');

// Box, Either, Task, List

// F.or, chain (flatMap, bind, >>=)

httpGet('/user')
    .chain(user =>
    httpget(`/comment/${user.id}`)
    .chain(comments =>
        updateDom(user, comments))) // Task(Task(Task(DOM)))

const join = m =>
    m.chain(x => x);

// const m = Box(Box(Box(3)));
// const res1 = join(m.map(join));
// const res2 = join(join(m));

const m = Box('wonder');
const res1 = join(Box.of(m));
const res2 = join(m.map(Box.of));

console.log(res1, res2);