// const { getEmployees, getEmployeeById, addEmployee, deleteEmployee, updateEmployee } = require('../controllers/employee');

const { getQuizScore, updateQuizScore, createQuizScore } = require('../controllers/quizScore');
const { manageCertificates } = require('../controllers/certificate');
const { getDetailChapter } = require('../controllers/chapter');
const { getExams, getExamById, storeExam, updateExam, deleteExam } = require('../controllers/exam');
const {getLessons, getLessonById, } = require('../controllers/lesson');
const { getProgress, createProgress } = require('../controllers/progress');
const { getQuizzes, storeQuiz, updateQuiz, getQuizById, deleteQuiz } = require('../controllers/quiz');
const { storeSubject } = require('../controllers/subject');
const { register, login, getUserById, changePassword, updateUser } = require('../controllers/user');

const router = require('express').Router();


router.post('/api/auth/register', register);
router.post('/api/auth/login', login);
// get detail user
router.get('/api/user/:id', getUserById);
// change password
router.put('/api/user/change-password', changePassword);
router.put('/api/user/:id', updateUser);

//lessons
router.get('/api/lessons', getLessons);
router.get('/api/lessons/:id', getLessonById);

//progress
router.get('/api/progress', getProgress);
router.post('/api/progress', createProgress);


//certificate
router.get('/api/certificate', manageCertificates);
module.exports = router;

// quiz score
router.get('/api/quizscore', getQuizScore);
router.post('/api/quizscore', createQuizScore);
router.put('/api/quizscore/:id', updateQuizScore);

//quiz
router.get('/api/quiz', getQuizzes);
router.get('/api/quiz/:id', getQuizById);
router.post('/api/quiz', storeQuiz);
router.put('/api/quiz/:id', updateQuiz);
router.delete('/api/quiz/:id', deleteQuiz);

// exam
router.get('/api/exam', getExams);
router.get('/api/exam/:id', getExamById);
router.post('/api/exam', storeExam);
router.put('/api/exam/:id', updateExam);
router.delete('/api/exam/:id', deleteExam);

//chapter
// router.get('/api/chapter', getChapters);
router.get('/api/chapter/:id', getDetailChapter);

//subject
router.post('/api/subject', storeSubject);

//certificate
router.get('/api/certificate', manageCertificates);
