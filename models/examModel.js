const { DataTypes } = require('sequelize');
const db = require('../config/db-config');
const Lesson = require('./lessonModels');

const Exam = db.define('Exam', {
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
  lesson_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Lessons',
      key: 'id',
    },
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

Lesson.hasOne(Exam, { as:'exam', foreignKey: 'lesson_id' });
Exam.belongsTo(Lesson, { foreignKey: 'lesson_id' });

module.exports = Exam;
