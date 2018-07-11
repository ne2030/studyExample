const query = require('./config.js').query;

function insert() {
    const params = [['ryan', 23], ['henry', 26], ['duncan', 30]];
    const sql = 'INSERT INTO test (name, age) VALUES ?';
    const query = pool.query(sql, [params], (err, rows) => {
        if (err) console.log(err);
        console.log(query.sql);
        console.log(rows);
    });
}

// insert();

function set() {
    let params = {
        name: 'ugly'
    };

    let sql = 'UPDATE test SET ?, age = ? WHERE id = 1';

    let query = pool.query(sql, [params, 22], (err) => {
        if(err) console.log(err);
        console.log(query.sql);
    });
}

// set();

function date() {
    const params = [[10, 'CURDATE() + INTERVAL 3 day', 'SUNDAY']];
    const sql = 'INSERT INTO date (num, date, usage_day_of_week) VALUES ?';
    query(sql, params)
        .catch(err => console.log(err));
}

date();
