// this file is basic version of all study examples
// if you need server instance for testing FE javascript, use this and
// just change 'res.render' target
// if you need other module support,
// please feel comfortable to install any other 3rd parth modules

const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// set view engine
app.engine('html', nunjucks.render);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './views'));

// set parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('mobile_gps');
});

const router = express.Router();

router.post('/stack', (req, res) => {
    res.send(1);
});

router.get('/stack', (req, res) => {
    res.send({ msg: 'name', result: 'success' });
});

app.use('/api', router);

app.listen('9000', () => console.log('server is running on port 9000'));
