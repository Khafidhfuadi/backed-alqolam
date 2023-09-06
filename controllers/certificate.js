const Certificate = require('../models/certificateModel');
const User = require('../models/userModel');
const Lesson = require('../models/lessonModels');
const { Op } = require('sequelize');
const moment = require('moment');

const manageCertificates = async (req, res) => {
  const { user_id, lesson_id } = req.query;

  try {
    let data;
    let predikat = {
      arab: 'default',
      latin: 'default',
    };

    if (lesson_id) {
      data = await Certificate.findAll({
        where: { user_id, lesson_id },
        include: [{ model: User }, { model: Lesson }],
      });

      if (data.length > 0) {
        const nilai_ujian = data[0].nilai_ujian;

        if (nilai_ujian <= 79) {
          predikat = {
            arab: 'جَيِّدٌ',
            latin: 'jayyidun',
          };
        } else if (nilai_ujian <= 89) {
          predikat = {
            arab: 'جَيّدٌ جِدًّا',
            latin: 'jayyid jiddan',
          };
        } else if (nilai_ujian <= 100) {
          predikat = {
            arab: 'مُمْتَازٌ',
            latin: 'mumtaz',
          };
        }
      }
    } else {
      data = await Certificate.findAll({
        where: { user_id },
        include: [{ model: User }, { model: Lesson }],
      });
    }

    if (data.length > 0) {
      const created = moment(data[0].createdAt).format('YYYY-MM-DD');

      return res.status(200).json({
        data,
        predikat,
        created,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: 'Tidak ada detail data!',
        data,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Terjadi kesalahan pada server.',
    });
  }
};

module.exports = { manageCertificates };
