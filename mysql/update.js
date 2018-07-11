const query = require('./config.js').query;

function _update() {
    const sql = 'UPDATE test SET ? WHERE id = ?';
    const params = { age: 30 };
    query(sql, [params, 4]);
}

_update();
