const fs = require('fs');
const path = require('path');
const request = require('request');

const token = 'xoxp-295341716373-295341716405-475990151461-6d2b2822ca6495edda895de634328b11';

const imagePath = path.resolve(__dirname, '../../example.png');

request.post({
    url: 'https://slack.com/api/files.upload',
    formData: {
        token,
        title: 'Image',
        filename: 'image.png',
        filetype: 'auto',
        channels: '#general',
        file: fs.createReadStream(imagePath),
    },
}, (err, response) => {
    console.log(JSON.parse(response.body));
});
