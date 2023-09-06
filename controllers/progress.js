const { QueryTypes } = require("sequelize");
const db = require("../config/db-config");
const Progress = require("../models/progressModel");
const Lesson = require("../models/lessonModels");
const Chapter = require("../models/chapterModel");
const Subject = require("../models/subjectModel");

const getProgress = async (req, res) => {
  const { user_id, lesson_id } = req.query;

  try {
    let whereClause = {};
    if (user_id) {
      whereClause.user_id = user_id;
    }
    if (lesson_id) {
      whereClause.lesson_id = lesson_id;
    }

    const progress = await Progress.findAll({
      where: whereClause,
      include: [
        {
          model: Lesson,
          attributes: [],

          include: [
            {
              model: Chapter,
              as: "chapter",
              attributes: [],

              include: [
                {
                  model: Subject,
                  as: "subject",
                  // no attributes
                  attributes: [],
                },
              ],
            },
          ],
        },
      ],
    });


if (lesson_id) {
  const lesson = await Lesson.findByPk(lesson_id, {
    include: [
      {
        model: Chapter,
        as: "chapter",
        include: [
          {
            model: Subject,
            as: "subject",
          },
        ],
      },
    ],
  });
  res.json({
    // message: "Berhasil boss",
    data : progress,
    subjectCount: lesson.chapter.reduce(
      (count, chapter) => count + chapter.subject.length,
      0
    ),
    subjectCountPerChapter: lesson.chapter.map((chapter) => ({
      chapter_id: chapter.id,
      subjectCount: chapter.subject.length,
    })),
  });
} else {
  res.json({
    // message: "Berhasil boss",
    data : progress,
  });
}

  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};


const createProgress = async (req, res) => {
  try {
    const { user_id, lesson_id, read_chapter, length_chapter } = req.body;

    // Buat objek Progress baru
    const progress = await Progress.create({
      user_id,
      lesson_id,
      read_chapter,
      length_chapter,
    });

    return res.json({ message: "Progress berhasil dibuat", progress });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

module.exports = { getProgress, createProgress };
