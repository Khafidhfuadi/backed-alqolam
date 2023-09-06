const {Sequelize} = require('sequelize');

const HOST = 'localhost';
const DB = 'alqolam';
const USERNAME = 'root';
const PASSWORD = '';

const db = new Sequelize(DB, USERNAME, PASSWORD, {
  host: HOST,
  dialect: 'mysql',
  logging: false,
});

db.sync({force: false}).then(() => {
  console.log('Database Syncronized!');
}).catch((err) => {
  console.log('Error: ' + err);
});

module.exports = db;