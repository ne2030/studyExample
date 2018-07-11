const fs = require('fs');
const path = require('path');


const dataPath = path.resolve(__dirname, './test1.jpg');
fs.stat(dataPath, (err, stats) => {
    console.log(stats);
    var fileSizeInBytes = stats["size"];
    //Convert the file size to megabytes (optional)
    var fileSizeInMegabytes = fileSizeInBytes / 1000000.0;

    console.log(fileSizeInMegabytes + 'MB');
});

fs.readFile(dataPath, (err, results) => {
    console.log(results);
})

