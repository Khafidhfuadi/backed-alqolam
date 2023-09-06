const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');
const db = require('../config/db-config');

const Quote = db.define('Quote', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  arab: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  arti: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updated_at',
  },
});

module.exports = Quote;
