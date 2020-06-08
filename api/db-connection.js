const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const config = require('../config');

const DB_PATH = path.join(__dirname, '..', 'db/chinook.sqlite');

const dbConnection = new sqlite3.Database(DB_PATH);

module.exports = dbConnection;
