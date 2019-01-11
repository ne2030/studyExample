const sharp = require('sharp');
const _ = require('partial-js');
const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

const read = promisify(fs.readFile);
const write = promisify(fs.writeFile);
const stat = promisify(fs.stat);
const append = promisify(fs.appendFile);

const getMetadata = s => s.metadata();

// stat(path.resolve(__dirname, './results/1--jpeg-90-2000.jpeg'))
//     .then(console.log(););

const transform = (size, q, name, format) => (img) => {
    const output = path.resolve(__dirname, name);
    return img.resize(size)[format]({ quality: q }).toFile(output);
};

// read(path.resolve(__dirname, './1--test.jpg'))
//     .then(d => transform(400, 80, './testSize2.jpeg')(sharp(d)))
//     ;

(async () => {
    for (const i of [1, 2, 3]) {
        let infos = '';
        const img = await read(path.resolve(__dirname, `./${i}--test.jpg`));
        const origin = sharp(img);

        const sizes = [2000, 1000, 700];
        const quality = [100, 90, 80, 70, 60, 40, 30, 20, 10];
        const metadata = await origin.metadata();

        await _.each(sizes, async (size) => {
            await _.each(quality, async (q) => {
                const filename = `./results/${i}--jpeg-${q}-${size}.png`;
                const output = path.resolve(__dirname, filename);
                await transform(size, q, filename, 'jpeg')(origin);

                const newImg = await stat(output);
                const buffer = await read(output);

                const info = `
                number :: ${i}
                size :: ${size}
                quality :: ${q}
                filename :: ${filename}
                filesize:: ${newImg.size / 1000}kb,
                buffersize :: ${buffer.length / 1000}kb
                `;

                infos += info;
            });
        });

        await append(path.resolve(__dirname, './info.txt'), infos);
    }

    let infos = '';
    const img = await read(path.resolve(__dirname, `./4--test.png`));
    const origin = sharp(img);

    const sizes = [2000, 1000, 700];
    const quality = [100, 90, 80, 70, 60, 40, 30, 20, 10];

    await _.each(sizes, async (size) => {
        await _.each(quality, async (q) => {
            const filename = `./results/4--png-${q}-${size}.png`;
            const output = path.resolve(__dirname, filename);
            await transform(size, q, filename, 'png')(origin);

            const newImg = await stat(output);
            const buffer = await read(output);

            const info = `
                number :: 4
                size :: ${size}
                quality :: ${q}
                filename :: ${filename}
                filesize:: ${newImg.size / 1000}kb,
                buffersize :: ${buffer.length / 1000}kb
                `;

            infos += info;
        });
    });

    await append(path.resolve(__dirname, './info.txt'), infos);

    // sharp(img)
    //     .resize(2000)
    //     .jpeg({
    //         quality: 50
    //     })
    //     .toFile(path.resolve(__dirname, './2--jpeg-100-resized.jpeg'))
    //     .then(() => console.log('success'))
    //     .catch(console.log);

    // sharp(img)
    //     .toBuffer()
    //     .then(d => write(path.resolve(__dirname, './buffer.png'), d))
    //     .catch(console.log);
})();
