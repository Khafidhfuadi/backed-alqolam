const { DataTypes } = require('sequelize');
const db = require('../config/db-config');
const User = require('./userModel');

const Lesson = db.define('Lesson', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    },
  },
  nama_pelajaran: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  tingkatan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  is_active: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2,
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

User.hasMany(Lesson, { as:'lesson', foreignKey: 'user_id' });
Lesson.belongsTo(User, { foreignKey: 'user_id' });


module.exports = Lesson;
