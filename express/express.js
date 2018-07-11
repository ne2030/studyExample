'use strict';

let express = require('express'),
    nunjucks = require('nunjucks'),
    fs = require('fs'),
    consolidate = require('consolidate'),
    app = express();

// set view engine
app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('./../views', {
    autoescape: true,
    express: app,
});

// app.use((req,res,next) => {
//   res.render('login');
// });

// app.use((req, res, next) => {
//   // null.length;
//   console.log('2');
//   // next();
// });


const a = (req, res, next) => {
    console.log('a1');
    next();
    console.log('a2');
};

const b = (req, res, next) => {
    console.log('b1');
    res.send('b');
    // next();
    console.log('b2');
};

const c = (req, res) => {
    console.log('c');
};

const router = express.Router();

router.use(a, b);

router.use(c);

app.get('/main', router);

// app.use((req, res, next) => {
//   console.log('4');
//   res.render('login');
//   // next();
// });

// app.get('/main', (req,res,next) => {
//     console.log('1');
//     res.render('index');
//     // next();
// });

app.listen('7878', () => console.log('server is running on port 7878'));
