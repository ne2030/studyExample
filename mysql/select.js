const co = require('co');
const query = require('./config.js').query;

function select() {
    co(function* () {
        const sql = 'SELECT * FROM test WHERE id = ?';
        const data = yield query(sql, 1);
        console.log(data.name);
    });
}

select();

function selectCount() {
    const sql = 'SELECT COUNT(*) AS count FROM types1';
    query(sql)
        .then((rows) => {
            console.log(rows);
            console.log(rows[0]);
            console.log(rows[0].count);
        });
}

// selectCount();
