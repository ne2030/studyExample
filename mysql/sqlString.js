const co = require('co');
const query = require('./config.js').query;

function mergeSqlString(...strings) {
    const newString = strings.reduce((prev, cur) => {
        return `${prev} ${cur.toSqlString()}`;
    }, '');
    return { toSqlString() { return newString; } };
}


function select() {
    co(function* () {
        try {
            const sql = 'SELECT * FROM date WHERE date > ?';
            const CURDATE = { toSqlString() { return 'CURDATE()'; } };
            const PLUS = { toSqlString() { return '+'; } };
            const INTERVAL = (amount, type) => ({ toSqlString() { return `INTERVAL ${amount} ${type}`; } });
            const sqlString = mergeSqlString(CURDATE, PLUS, INTERVAL(1, 'day'));
            console.log(sqlString);
            const data = yield query(sql, [sqlString]);
            console.log(data.name);
        } catch (err) {
            console.log(err);
        }
    });
}


select();
