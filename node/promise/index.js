const fs = require('fs');

const path = require('path');

const filePath = path.resolve(__dirname, './sample.txt');

console.log('start');

const result = fs.readFile(filePath, (err, data) => {
    if (err) return console.log(err);
    console.log(data);
});

const promise = new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
        if (err) reject(err);
        resolve(data);
    });
});

promise.then((data) => {

})


