const sharp = require('sharp');
const _ = require('partial-js');
const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

const read = promisify(fs.readFile);
const write = promisify(fs.writeFile);

const getMetadata = (s) => s.metadata()
})
    
(async () => {
    const img = await read(path.resolve(__dirname, './2--test.jpg'));
    const origin = sharp(img);

    const sizes = [2000, 1000, 700];
    const quality = [80, 70, 60, 40, 30, 20, 10];
    const metadata = await origin.metadata();

    _.map(sizes, size => {
        _.map(quality, q => {
            const output = path.resolve(__dirname, `./2--jpeg-100-resized.jpeg`);
            origin.resize(size).jpeg({ quality: q })
                toFile(path.)
        })
    });
    sharp(img)
        .resize(2000)
        .jpeg({
            quality: 50
        })
        .toFile(path.resolve(__dirname, './2--jpeg-100-resized.jpeg'))
        .then(() => console.log('success'))
        .catch(console.log);

    // sharp(img)
    //     .toBuffer()
    //     .then(d => write(path.resolve(__dirname, './buffer.png'), d))
    //     .catch(console.log);
})();
