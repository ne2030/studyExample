const mkdirp = require('mkdirp');

mkdirp('tmp/foo/bar/baz', (err) => {
    if (err) console.error(err);
    else console.log('pow!');
});
