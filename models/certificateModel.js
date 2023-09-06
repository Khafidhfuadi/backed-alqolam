const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');
const db = require('../config/db-config');
const User = require('./userModel');
const Lesson = require('./lessonModels');

const Certificate = db.define('Certificate', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  certif_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id',
    }
  },
  lesson_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Lessons',
      key: 'id',
    }
  },
  nilai_ujian: {
    type: DataTypes.INTEGER,
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

User.hasMany(Certificate, {  foreignKey: 'user_id' });
Certificate.belongsTo(User, { foreignKey: 'user_id' });


Lesson.hasMany(Certificate, {  foreignKey: 'lesson_id' });
Certificate.belongsTo(Lesson, { foreignKey: 'lesson_id' });

module.exports = Certificate;
