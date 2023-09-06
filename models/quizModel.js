const { DataTypes } = require('sequelize');
const db = require('../config/db-config');
const Lesson = require('./lessonModels');
const Chapter = require('./chapterModel');

const Quiz = db.define('Quiz', {
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
    }
  },
  question_text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answer_options: {
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
}, 
{
  freezeTableName: true,
});

Chapter.hasOne(Quiz, { as:'quiz', foreignKey: 'chapter_id' });
Quiz.belongsTo(Chapter, { foreignKey: 'chapter_id' });

module.exports = Quiz;
