//Import
const pg = require('pg');

//Database connection
const pool = new pg.Pool({
    database: 'koalas',
    host: 'localhost',
    port: '5432'
})

module.exports = pool;