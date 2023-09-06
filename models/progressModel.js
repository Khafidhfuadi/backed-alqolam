const { DataTypes } = require('sequelize');
const db = require('../config/db-config');
const Lesson = require('./lessonModels');
const Chapter = require('./chapterModel');
const Subject = require('./subjectModel');

const Progress = db.define('Progress', {
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
  chapter_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Chapters',
      key: 'id',
    },
  },
  subject_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Subjects',
      key: 'id',
    },
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
}, {
  tableName: 'progress', // Specify the custom table name
});

Lesson.hasMany(Progress, { as:'progress', foreignKey: 'lesson_id' });
Progress.belongsTo(Lesson, { foreignKey: 'lesson_id' });

Subject.hasMany(Progress, { as:'progress', foreignKey: 'subject_id' });
Progress.belongsTo(Subject, { foreignKey: 'subject_id' });



module.exports = Progress;
