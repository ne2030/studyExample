const mysql = require('mysql');
const secret = require('./secret');

const config = {
    connectionLimit: 30,
    host: 'localhost',
    port: '3306',
    user: 'ryan',
    password: secret.password,
    database: 'test',
    debug: false,
};

// Create pool for each database
const pool = mysql.createPool(config);

exports.query = (sql, params) => {
    return new Promise((resolve, reject) => {
        const query = pool.query(sql, params, (err, rows) => {
            if (err) reject(err);
            console.log('sql ::', query.sql);
            console.log('rows:: ', rows);
            resolve(rows);
        });
    });
};

exports.pool = pool;
