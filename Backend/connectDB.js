// database.js
const mysql = require('mysql');

class Database {
    constructor() {
        if (!Database.instance) {
            this.connection = mysql.createConnection({
                host: 'localhost', // Replace with your host
                user: 'root',      // Replace with your database username
                password: '',      // Replace with your database password
                database: 'test' // Replace with your database name
            });

            this.connection.connect((err) => {
                if (err) {
                    console.error('Error connecting to the database:', err.stack);
                    return;
                }
                console.log('Connected to the database as id', this.connection.threadId);
            });

            Database.instance = this;
        }

        return Database.instance;
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }
}

const instance = new Database();
Object.freeze(instance);

module.exports = instance;
