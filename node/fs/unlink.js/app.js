const fs = require('fs');

// fs.mkdirSync('./testFolder');
fs.writeFileSync('./testFolder/test.js', 'hi its a test file');

function remove() {
    fs.unlinkSync('./testFolder/test.js');
}

setTimeout(remove, 5000);
