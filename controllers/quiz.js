const { Op } = require('sequelize');
const Quiz = require('../models/quizModel');
const Chapter = require('../models/chapterModel');

const { validationResult } = require('express-validator');

const getQuizzes = async (req, res) => {
  try {
    const { cari } = req.query;

    const query = cari ? cari : '';

    // Find quizzes with optional filtering by chapter_id
    const quizzes = await Quiz.findAll({
      where: {
        chapter_id: { [Op.like]: `%${query}%` },
      },
      include: [
        {
          model: Chapter  ,
          attributes: ['name'],
        },
      ],
    });

    res.json({ message: 'Berhasil boss', data: quizzes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




// Store a quiz
const storeQuiz = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all the required fields',
        errors: errors.array(),
      });
    }

    const { user_id, chapter_id, question_text, answer_options } = req.body;

    // Create a new quiz
    const quiz = await Quiz.create({
      user_id,
      chapter_id,
      question_text,
      answer_options,
    });

    if (quiz) {
      return res.status(200).json({
        success: true,
        message: 'Data successfully saved!',
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Failed to save data!',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a quiz by ID
const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findOne({
      where: { id },
    });

    if (!quiz) {
      return res.status(404).json({
        message: 'Quiz not found',
      });
    }

    return res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getQuizById };

// Update a quiz
const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, chapter_id, question_text, answer_options } = req.body;

    // Find the quiz by ID
    const quiz = await Quiz.findByPk(id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found',
      });
    }

    // Update the quiz
    quiz.user_id = user_id;
    quiz.chapter_id = chapter_id;
    quiz.question_text = question_text;
    quiz.answer_options = answer_options;

    // Save the changes
    await quiz.save();

    return res.status(200).json({
      success: true,
      message: 'Data successfully updated',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// delete a quiz
const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the quiz by ID
    const quiz = await Quiz.findByPk(id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found',
      });
    }

    // Delete the quiz
    await quiz.destroy();

    return res.status(200).json({
      success: true,
      message: 'Data successfully deleted',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = { getQuizzes, storeQuiz, getQuizById, updateQuiz, deleteQuiz };
