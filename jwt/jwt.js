'use strict';

let express = require('express'),
    swig = require('swig'),
    fs = require('fs'),
    consolidate = require('consolidate'),
    jwt = require('jsonwebtoken'),
    bodyParser = require('body-parser'),
    app = express();

//set view engine
app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views')

//set parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req,res,next) => {
    console.log('1');
    next();
});

app.get('/', (req,res,next) => {
    console.log('2');
    res.render('index');
});

app.post('/', (req,res,next) => {
    let id = req.body.id;
    let pw = req.body.password;
    let jwtOptions = {
        algorithm: 'HS256',
        expiresIn: '3h',
        issuer: 'test user',
    };
    let jwToken = jwt.sign({user: id}, 'show me the money', jwtOptions);
    console.log(jwToken);
});

app.listen('9000', ()=> console.log('server is running on port 9000'));
