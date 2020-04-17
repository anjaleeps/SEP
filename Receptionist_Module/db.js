const pgp = require('pg-promise')()

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'hospital_management',
    user: 'postgres',
    password: 'nevermind',
};

const db = pgp(cn);

module.exports = db


