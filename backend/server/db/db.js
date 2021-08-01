const mysql = require('mysql');
const nconf = require('nconf');

const conn = mysql.createConnection({
    host: nconf.get('database:host'),
    user: nconf.get('database:user'),
    password: nconf.get('database:password'),
    database: nconf.get('database:database'),
    charset: nconf.get('database:charset')
});

conn.connect((err) => {
    if(err) {
        return console.error('DATABASE ERROR: ' + err.message);
    }
    console.warn(`Connected to the MySQL Databaase / Server "${nconf.get('database:host')}"`);
});


module.exports = {
    conn
}