const { Op } = require('sequelize');
const Exam = require('../models/examModel');
const Chapter = require('../models/chapterModel');

const { validationResult } = require('express-validator');
const Lesson = require('../models/lessonModels');

const getExams = async (req, res) => {
  try {
    const { cari } = req.query;

    const query = cari ? cari : '';

    // Find exams with optional filtering by lesson_id
    const exams = await Exam.findAll({
      where: {
        lesson_id: { [Op.like]: `%${query}%` },
      },
      include: [
        {
          model: Lesson,
          attributes: ['nama_pelajaran'],
        },
      ],
    });

    res.json({ message: 'Berhasil boss', data: exams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




// Store a quiz
const storeExam = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all the required fields',
        errors: errors.array(),
      });
    }

    const { user_id, lesson_id, question_text, answer_options } = req.body;

    // Create a new exam
    const exam = await Exam.create({
      user_id,
      lesson_id,
      question_text,
      answer_options,
    });

    if (exam) {
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

// Get a exam by ID
const getExamById = async (req, res) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findOne({
      where: { id },
    });

    if (!exam) {
      return res.status(404).json({
        message: 'exam not found',
      });
    }

    return res.json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Update a quiz
const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, lesson_id, question_text, answer_options } = req.body;

    // Find the exam by ID
    const exam = await Quiz.findByPk(id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found',
      });
    }

    // Update the quiz
    exam.user_id = user_id;
    exam.lesson_id = lesson_id;
    exam.question_text = question_text;
    exam.answer_options = answer_options;

    // Save the changes
    await exam.save();

    return res.status(200).json({
      success: true,
      message: 'Data successfully updated',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// delete a exam
const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the exam by ID
    const exam = await Exam.findByPk(id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: 'Exam not found',
      });
    }

    // Delete the quiz
    await exam.destroy();

    return res.status(200).json({
      success: true,
      message: 'Data successfully deleted',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = { getExams, storeExam, getExamById, updateExam, deleteExam };
