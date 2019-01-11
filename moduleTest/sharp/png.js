const sharp = require('sharp');
const _ = require('partial-js');
const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

const read = promisify(fs.readFile);
const write = promisify(fs.writeFile);
const stat = promisify(fs.stat);
const append = promisify(fs.appendFile);

(async () => {
    const input = path.resolve(__dirname, './png.js');
    const d = await read(input);
    sharp(d).metadata().then(console.log).catch(console.log);


    // const output = await sharp(d).resize(500).png().toBuffer();
    // const outputName = path.resolve(__dirname, './png-500.png');
    // console.log(outputName);
    // await write(outputName, output);
})();
