const gm = require('gm').subClass({ imageMagick: true });
const fs = require('fs');
const path = require('path');

// resize and remove EXIF profile data
// gm('./input.png')
//     .resize(200, 200)
//     .write('./result.png', (err) => {
//         if (err) {
//             console.log(err);
//         } else { console.log('success!'); }
//     });


// put watermark
const imgPath = path.resolve(__dirname, './test1.png');
const waterPath = path.resolve(__dirname, './kit/watermark_400.png');
const destPath = path.resolve(__dirname, './afterWater4.png');

const testBuf = fs.readFileSync(imgPath);
const watermarkBuf = fs.readFileSync(waterPath);

const on = gm(testBuf)
// .draw(`image over 400,400 0,0`)
.composite(waterPath)
.geometry('+200+100');

// .command('composite')
// .out('-geometry', '+200+100') // offset
// .in(waterPath);

console.log(on);

on.write(destPath, err => console.log(err));
