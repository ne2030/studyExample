const Task = require('data.task');
const fs = require('fs');

const app = () =>
    fs.readFile('test.json', 'utf8', (err, results) => {
        if (err) throw err;

        const newContents = results.replace('8', '1');

        fs.writeFile('12-test.json', newContents, (err) => {
            if (err) throw err;
            console.log('success');
        });
    });

const readFile = name => new Task(
    (rej, res) => fs.readFile(name, 'utf8', (err, results) => (err ? rej(err) : res(results)))
);

const writeFile = (name, data) => new Task(
    (rej, res) => fs.writeFile(name, data, (err, result) => (err ? rej(err) : res('success')))
);

readFile('test.json')
    .map(x => x.replace('8', '1'))
    .chain(d => writeFile('12-test.json', d))
    .fork(e => console.log('error', e),
            x => console.log(x));


// app();
