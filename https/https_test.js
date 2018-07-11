'use strict';

const co = require('co');
const fs = require('fs');
const tfy = require('thunkify');
const express = require('express');
const https = require('https');
const http = require('http');
const path = require('path');
const bodyparser = require('body-parser');
const nunjucks = require('nunjucks');

const app = express();

// express middlewares
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

// set view engine
app.set('views', path.resolve(__dirname, './../views'));
app.set('view engine', 'html');

nunjucks.configure('../views', {
    autoescape: true,
    express: app,
});
// app.use(express.static('../views'));

// https
const read = tfy(fs.readFile);
let options;

co(function* () {
    const key = read('key.pem', 'utf8');
    const cert = read('cert.pem', 'utf8');
    const res = yield [key, cert];
    options = {
        key: res[0],
        cert: res[1],
    };

    http.createServer(app).listen(80);
    https.createServer(options, app).listen(443, () => console.log('server is running on port:80'));
}());

app.get('/', (req, res) => {
    res.render('mobile_gps');
});

app.post('/', (req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    if (id == 'ne2030' && password == 'rudgnstls2') {
        res.render('login', { id });
        console.log(`${id} logged in!`);
    } else {
        console.log(`sorry, i can't find ${id} in the list`);
        res.redirect('/');
    }
});

app.post('/api', (req, res, next) => {
    console.log('req.body: ' + req.body);
    console.log('req.body[0].city' + req.body[0].city);
});
