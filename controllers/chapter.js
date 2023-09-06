const Chapter = require('../models/chapterModel');

// Get detail chapter name
const getDetailChapter = async (req, res) => {
  try {
    const { id } = req.params;

    const chapter = await Chapter.findOne({
      attributes: ['name'], // Only retrieve the name attribute
      where: { id },
    });

    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    res.json({ message: 'Nama Chapter', name: chapter.name });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = { getDetailChapter };
