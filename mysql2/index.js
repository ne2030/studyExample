const mysql = require('mysql2');

const options = {
    host: '*',
    user: 'root',
    password: '*',
    database: 'parkingshare',
    port: 3306,
    connectionLimit: 5,
};

const pool = mysql.createPool(options);

function testQuery() {
    return new Promise((resolve, reject) => {
        pool.query('SELECT 1', (err, results) => {
            if (err) {
                console.log(err);
                return reject(err);
            }

            console.log('success!!');
            resolve(true);
        });
    });
}

function query(sql, param) {
    return new Promise((resolve, reject) => {
        pool.query(sql, param, (err, results) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports.query = query;
