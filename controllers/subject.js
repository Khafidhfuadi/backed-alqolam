
const Subject = require('../models/subjectModel');
const { validationResult } = require('express-validator');

// post controller
const storeSubject = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all the required fields',
        errors: errors.array(),
      });
    }

    const { user_id, chapter_id, name, subject_content } = req.body;

    // Create a new subject
    const subject = await Subject.create({
      user_id,
      chapter_id,
      name,
      subject_content,
    });

    if (subject) {
      return res.status(200).json({
        success: true,
        message: 'Subject created successfully',
        data: subject,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  storeSubject,
};
