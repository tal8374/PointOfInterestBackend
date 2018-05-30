const express = require('express');
const router = express.Router();
const questionController = require('../controller/question');

router
    .post('/', questionController.createQuestion);

router
    .get('/list', questionController.getQuestions);

router
    .get('/:questionId', questionController.getQuestion)
    .put('/:questionId', questionController.updateQuestion)
    .delete('/:questionId', questionController.deleteQuestion);

module.exports = router;