'use strict';

var bodyParser = require('body-parser');
var methodOverride = require('method-override');

let express = require('express'),
    swig = require('swig'),
    fs = require('fs'),
    consolidate = require('consolidate'),
    app = express();

//parse middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// method override
app.use(methodOverride('_method'))
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

//set view engine
app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views')

app.get('/', (req,res) => {
    res.render('index');
});

app.delete('/', (req,res) => {
    console.log(`delete method`);
});

app.listen('9000', ()=> console.log('server is running on port 9000'));
