const squel = require("squel");
const DButilsAzureService = require('../../../DB/DButils');

function addQuestionQuery(req) {
    return squel.insert()
        .into("Question")
        .set("content", req.body.content)
        .toString();
}

function addQuestion(req) {
    const query = addQuestionQuery(req);

    return DButilsAzureService.Insert(DButilsAzureService.connection, query);
}

function getQuestionsQuery() {
    return 'Select * FROM Question';
}

function getQuestions() {
    const query = getQuestionsQuery();

    return DButilsAzureService.Select(DButilsAzureService.connection, query);
}

function removeQuestionQuery(req) {
    const questionId = req.param.questionId;

    return "DELETE FROM Question WHERE questionId=" + questionId;
}

function removeQuestion(req) {
    const query = removeQuestionQuery(req);

    return DButilsAzureService.Delete(DButilsAzureService.connection, query);
}

function updateQuestionQuery(req) {
    const questionId = req.param.questionId;

    return squel.update()
        .table("Question")
        .set("content", req.body.content)
        .where("questionId = " + questionId)
        .toString();
}

function updateQuestion(req) {
    const query = updateQuestionQuery(req);

    return DButilsAzureService.Update(DButilsAzureService.connection, query);
}

function getQuestionQuery(req) {
    const questionId = req.params.questionId;

    return 'Select * from Question ' +
        'WHERE Question.questionId=' + questionId;
}

function getQuestion(req) {
    const query = getQuestionQuery(req);

    return DButilsAzureService.Select(DButilsAzureService.connection, query);
}

function handleError(err, res) {
    if (err.message && err.message.includes("Violation of PRIMARY KEY constraint")) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
    else {
        res.status(500).send('500 - server error: ' + err.message);
    }
}


module.exports = {
    addQuestion,

    getQuestions,

    removeQuestion,

    updateQuestion,

    getQuestion,

    handleError,

};