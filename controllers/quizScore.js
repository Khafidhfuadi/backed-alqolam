const { QueryTypes } = require("sequelize");
const db = require("../config/db-config");
const Progress = require("../models/progressModel");
const Lesson = require("../models/lessonModels");
const Chapter = require("../models/chapterModel");
const Subject = require("../models/subjectModel");
const QuizScore = require("../models/quizScore");

const getQuizScore = async (req, res) => {
  // get where chapter_id from query and user_id from req.user
  const { chapter_id } = req.query;
  const { user_id } = req.query;

  try {
    // get all quiz scores from db
    const data = await db.query(
      `SELECT * FROM quizscore WHERE user_id = ${user_id} AND chapter_id = ${chapter_id}`,
      { type: QueryTypes.SELECT }
    );

    // return length of data
    return res.status(200).json({ data });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }

  
};

const updateQuizScore = async (req, res) => {
  try {
    const { id } = req.params;
    const { score } = req.body;

    // Find the quiz by ID
    const quizScore = await QuizScore.findByPk(id);

    if (!quizScore) {
      return res.status(404).json({
        success: false,
        message: 'quizScore not found',
      });
    }

    // Update the quizScore
    quizScore.score = score;

    // Save the changes
    await quizScore.save();

    return res.status(200).json({
      success: true,
      message: 'Data successfully updated',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// create a quizScore
const createQuizScore = async (req, res) => {
  try {
    const { user_id, chapter_id, score } = req.body;

    // Create a new quizScore
    const quizScore = await QuizScore.create({
      user_id,
      chapter_id,
      score,
    });

    if (quizScore) {
      return res.status(200).json({
        success: true,
        message: 'quizScore created successfully',
        data: quizScore,
      });

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}





module.exports = { getQuizScore, updateQuizScore, createQuizScore };
