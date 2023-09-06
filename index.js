const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db-config");
const router = require("./routes");
const Chapter = require("./models/chapterModel");
const Quote = require("./models/quoteModel");
const Certificate = require("./models/certificateModel");
const Progress = require("./models/progressModel");
const Quiz = require("./models/quizModel");
const Subject = require("./models/subjectModel");
const Lesson = require("./models/lessonModels");
const Exam = require("./models/examModel");
const QuizScore = require("./models/quizScore");
// const Users = require("./models/userModels");

// const router = require("./routes/index");

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));

async function connectToDb() {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
    await QuizScore.sync();

  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
}

connectToDb();

app.use(router);

app.get("/", (req, res) => {
  res.json({ message: "FROM API." });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
