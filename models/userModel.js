const {Sequlize, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');


const db = require('../config/db-config');
// console.log('db:', db);


const User = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email_verified_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rememberToken: {
    type: DataTypes.STRING,
    allowNull: true
  }
},
{
  freezeTableName: true,
});

// Metode untuk memeriksa kecocokan password
User.prototype.validPassword = function (password) {
  return bcrypt .compareSync(password, this.password);
};

module.exports = User;