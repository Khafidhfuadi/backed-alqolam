const { Sequelize } = require("sequelize");
const Quiz = require("../models/quizModel");
const Chapter = require("../models/chapterModel");
const Lesson = require("../models/lessonModels");
const Progress = require("../models/progressModel");
const User = require("../models/userModel");
const Subject = require("../models/subjectModel");
const Exam = require("../models/examModel");
// const Progres = require("../models/progresModel");

const getLessons = async (req, res) => {
  const { cari, role } = req.query;

  try {
    let lessons;

    if (role === "guru") {
      if (cari) {
        lessons = await Lesson.findAll({
          where: { user_id: cari },
          include: [
            {
              model: Chapter,
              as: "chapter",
              include: [
                { model: Subject, as: "subject" },
                { model: Quiz, as: "quiz" },
              ],
            },
          ],
        });
      } else {
        lessons = await Lesson.findAll({
          include: [
            {
              model: Chapter,
              as: "chapter",
              include: [
                { model: Subject, as: "subject" },
                { model: Quiz, as: "quiz" },
              ],
            },
          ],
        });
      }
    } else {
      if (cari) {
        lessons = await Lesson.findAll({
          where: { is_active: 2 },
          include: [
            {
              model: Progress,
              where: { user_id: cari },
              as: "progress",
              required: false,
            },
            {
              model: Chapter,
              as: "chapter",
              attributes: [],
            },
          ],
          attributes: {
            include: [
              [
                Sequelize.literal(
                  "(SELECT COUNT(*) FROM chapters WHERE chapters.lesson_id = Lesson.id)"
                ),
                "chapter_count",
              ],
            ],
          },
        });
      } else {
        lessons = await Lesson.findAll({
          include: [
            { model: Chapter, as: "chapter", include: [{ model: Subject, as: "subject" }, { model: Quiz, as: "quiz" }]},
            { model: Progress, as: "progress" },
            
          ],
        });
      }
    }

    res.json(lessons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

const getLessonById = async (req, res) => {
  const { id } = req.params;

  try {
    const lesson = await Lesson.findOne({
      where: { id },
      include: [
        {
          model: Chapter,
          as: "chapter",
          include: [
            { model: Subject, as: "subject" },
            { model: Quiz, as: "quiz" },
          ],
        },
        { model: User, attributes: ["name"] },
        { model: Exam, as: "exam" },
      ],
    });

    if (lesson) {
      let quizCount = 0;

      // Count quizzes for each chapter
      lesson.chapter.forEach((chapter) => {
        if (chapter.quiz) {
          quizCount += 1;
        }
      });

      res.json({
        ...lesson.toJSON(),
        subjectCount: lesson.chapter.reduce(
          (count, chapter) => count + chapter.subject.length,
          0
        ),
        quizCount: quizCount,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Tidak ada detail data!",
        data: "Kosong!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan pada server." });
  }
};

module.exports = {
  getLessons,
  getLessonById,
};
