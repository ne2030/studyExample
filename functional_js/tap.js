const _ = require('partial-js');

_.go(100,
    a => a * 3,
    _.tap(
        b => b * 2,
        c => c + 10,
        _.hi,
    ),
    _.hi,
);
