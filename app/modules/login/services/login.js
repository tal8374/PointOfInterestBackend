const squel = require("squel");
const DButilsAzureService = require('../../../DB/DButils');
const jwt = require('jsonwebtoken');

function loginUserQuery(req) {
    const userName = "'" + req.body.userName + "'";
    const password = "'" + req.body.password + "'";

    return "Select * FROM Users WHERE userName=" + userName + " AND password=" + password;
}

function loginUser(req) {
    const query = loginUserQuery(req);

    return DButilsAzureService.Select(DButilsAzureService.connection, query);
}

function recoverUserQuery(req) {
    const userName = "'" + req.body.userName + "'";
    const password = req.body.password;

    return squel.update()
        .table("Users")
        .set("password", password)
        .where("userName = " + userName)
        .toString();
}

function recoverUser(req) {
    const query = recoverUserQuery(req);

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

function findUserExistQuery(req) {
    const userName = "'" + req.body.userName + "'";
    const answer1 = "'" + req.body.answer1 + "'";
    const answer2 = "'" + req.body.answer2 + "'";

    return "Select * FROM Users WHERE userName=" + userName + " AND answer1=" + answer1 + " AND answer2=" + answer2;
}

function findUser(req) {
    const query = findUserExistQuery(req);

    return DButilsAzureService.Select(DButilsAzureService.connection, query);
}

function getUserQuestionQuery(req) {
    const userName = "'" + req.body.userName + "'";

    return "Select question1, question2 FROM Users WHERE userName=" + userName ;
}

function getUserQuestion(req) {
    const query = getUserQuestionQuery(req);

    return DButilsAzureService.Select(DButilsAzureService.connection, query);
}

function sendToken(user, res) {
    const superSecret = "SUMsumOpen"; // secret variable

    const payload = {
        userName: user.userName,
        userId: user.userId,
    };

    const token = jwt.sign(payload, superSecret, {
        expiresIn: "1d" // expires in 24 hours
    });

    res.json({
        success: true,
        token: token
    });

}

module.exports = {
    loginUser,

    recoverUser,

    handleError,

    findUser,

    getUserQuestion,

    sendToken
};