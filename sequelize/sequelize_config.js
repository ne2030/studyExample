'use strict';

let co = require('co');

module.exports.config = function*(Sequelize) {

    let db = {}

    //sequelize db connecting
    let sequelize = new Sequelize(
        'test',
        'root',
        '', {
            host: '127.0.0.1',
            dialect: 'mysql',
            port: 3306
        });

    sequelize
        .authenticate()
        .then(() => console.log('Connection has been established successfully.'),
         (err) => console.log('Unable to connect to the database:', err));

    // Create Testing Table 'Chat'
    let _Chat = sequelize.define('Chat', {
        name: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        content: {
            type: Sequelize.STRING(255),
            allowNull: false
        }
    }, {
        paranoid: true,
        associate: function(models) {
            Chat.belongsTo(models.User);
            // Chat.belongsTo(models.User, {
            //     // foreignKey: {allowNull: false}
            // });
        }
    });

    // Create Testing Table 'User'
    let _User = sequelize.define('User', {
        name: {
            type: Sequelize.STRING(20),
            allownull: false
        },
        phone: {
            type: Sequelize.STRING(20),
            allowNull: false
        }
    });

    let [Chat, User] = yield [_Chat, _User]
    console.log(User);
    db.Chat = Chat;
    db.User = User;

    Chat.options.associate(db);

    return Object.assign({sequelize: sequelize}, db);
}

module.exports.seed = (db) => {
    //Seed data
    makeSeed(db);

    function makeSeed (db){
        let users = []; let chats = [];
        for(let i = 0; i < 10; i++) {
            users.push({
                name: `test_user ${i}`,
                phone: Math.floor(Math.random() * 1000)
            });

            chats.push({
                name: `test_user ${i}`,
                content: `foo ${i * 10}`,
                UserId: i+1,
            });
        }
        console.log(3, 'seed');
        db.User.bulkCreate(users);
        db.Chat.bulkCreate(chats);
    }
}
