'use strict';

// 원하는 테스트 파일 삽입
const mysql = require('../mysql2/index.js');

const express = require('express'),
    nunjucks = require('nunjucks'),
    bodyParser = require('body-parser'),
    app = express();

// set view engine
app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('./../views', {
    autoescape: true,
    express: app,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
    res.render('maps');
});

app.post('/', (req, res, next) => {
    console.log('req.body: ' + req.body);
    console.log('req.body[0].city' + req.body[0].city);
});

app.listen('9000', () => console.log('server is running on port 9000'));
