'use strict';

//dependencies
let express = require('express'),
    swig = require('swig'),
    consolidate = require('consolidate'),
    Sequelize = require('sequelize'),
    co = require('co');

let app = express();
let sequelize;
 // = require('./sequelize_config').config(Sequelize);


//set view engine
app.engine('html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views')

app.get('/', (req,res,next) => {
    // res.render('sequelize');
    co(function*(){
    try {
        let data = yield sequelize.Chat.findAndCountAll({
            where: {
                id: {
                    gt: 5
                }
            },
            include: [{
                model: sequelize.User,
                where: {
                    phone: {
                        gt: 700
                    }
                }
            }]
        });
        data.rows.map((val) => {
            console.log(`chat id: ${val.id}`);
            console.log(`chat content: ${val.content}`);
            console.log(`phone number: ${val.User.phone}`);
        });
        res.render('sequelize', {data});
    } catch (e) { console.error(e);}
    });
});

// sequelize sync
co(function*(){
try {
    sequelize = yield* require('./sequelize_config').config(Sequelize);

    // yield sequelize.sequelize.sync({ force: true })

    console.log(2, 'sync');
    // yield [require('./sequelize_config').seed(sequelize)]

} catch (e) { console.error(e, 'sync'); }
})

app.listen(9090, () => console.log('port 9090'));
