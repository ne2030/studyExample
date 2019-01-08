const ImageParser = require('image-parser');
const path = require('path');

const img = new ImageParser(path.join(__dirname, './test.jpeg'));
img.parse((err) => {
    if (err) {
        return console.error(err);
    }

    // 이미지 기본정보
    const width = img.width();
    const height = img.height();

    console.log(width, height);

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const pixel = img.getPixel(i, j);
            if (
                pixel.r < 180 &&
                pixel.r > 170 &&
                pixel.g > 210 &&
                pixel.g < 220
            ) {
                console.log(pixel, i, j);
            }
        }
    }

    // PixelClass { r: 34, g: 30, b: 31, a: 1 }
});
