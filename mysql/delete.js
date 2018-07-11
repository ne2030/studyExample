const pool = require('./config.js');

function _delete() {
    const sql = 'DELETE FROM test WHERE id = 5';
    const query = pool.query(sql, function (err, rows) {
        if (err) console.log(err);
        console.log(query.sql);
        console.log(rows);
    });
}

_delete();
