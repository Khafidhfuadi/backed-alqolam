const { DataTypes } = require('sequelize');
const db = require('../config/db-config');
const Lesson = require('./lessonModels');

const Chapter = db.define('Chapter', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  lesson_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Lessons',
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

Lesson.hasMany(Chapter, { as:'chapter', foreignKey: 'lesson_id' });
Chapter.belongsTo(Lesson, { foreignKey: 'lesson_id' });

module.exports = Chapter;
