const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-config');
const db = require('../config/db-config');
const User = require('./userModel');
const Chapter = require('./chapterModel');

const QuizScore = db.define('QuizScore', {
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
    }
  },
  chapter_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Chapters',
      key: 'id',
    },
  },
  score: {
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
},

//change name table to quiz_score
{
  freezeTableName: true,
}

);

User.hasOne(QuizScore, {  foreignKey: 'user_id' });
QuizScore.belongsTo(User, { foreignKey: 'user_id' });


Chapter.hasOne(QuizScore, {  foreignKey: 'chapter_id' });
QuizScore.belongsTo(Chapter, { foreignKey: 'chapter_id' });

module.exports = QuizScore;
