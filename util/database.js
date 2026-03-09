const mysql = require ('mysql2');

const pool = mysql.createPool({
    host: 'localhost:8383',
    user: 'root',
    database: 'TC2005B',
    password: 'admin',

});

module.exports = pool.promise();