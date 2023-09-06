const { DataTypes } = require('sequelize');
const db = require('../config/db-config');
const Lesson = require('./lessonModels');
const Chapter = require('./chapterModel');

const Subject = db.define('Subject', {
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
  chapter_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Chapters',
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject_content: {
    type: DataTypes.TEXT,
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

Chapter.hasMany(Subject, { as:'subject', foreignKey: 'chapter_id' });
Subject.belongsTo(Chapter, { foreignKey: 'chapter_id' });

module.exports = Subject;
