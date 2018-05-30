const questionService = require('../services/question');

function createQuestion(req, res) {
    console.log("**POST request for creating question**");

    questionService.addQuestion(req)
        .then(function () {
            res.send("Success in creating a question");
        })
        .catch(function (err) {
            console.log(err.message);

            questionService.handleError(err, res)
        });
}

function getQuestions(req, res) {
    console.log("**GET request for questions**");

    questionService.getQuestions()
        .then(function (questions) {
            res.send(questions);
        })
        .catch(function (err) {
            console.log(err.message);

            questionService.handleError(err, res);
        });
}

function getQuestion(req, res) {
    console.log("**GET request for question**");

    questionService.getQuestion(req)
        .then(function (question) {
            res.send(question);
        })
        .catch(function (err) {
            console.log(err.message);

            questionService.handleError(err, res);
        });
}

function updateQuestion(req, res) {
    console.log("**UPDATE request for updating a question**");

    questionService.updateQuestion(req)
        .then(function () {
            res.send("Success in updating question");
        })
        .catch(function (err) {
            console.log(err.message);

            questionService.handleError(err, res);
        });
}

function deleteQuestion(req, res) {
    console.log("**DELETE request for deleting a question**");

    questionService.removeQuestion(req)
        .then(function () {
            res.send("Success in delete a question");
        })
        .catch(function (err) {
            console.log(err.message);

            questionService.handleError(err, res);
        });
}

module.exports = {
    createQuestion,

    getQuestions,

    getQuestion,

    updateQuestion,

    deleteQuestion
};