const registerService = require('../services/register');

function addUser(req, res) {
    console.log("**POST request for register**");

    registerService.createUser(req, res)
        // .then(registerService.getLastAddedUserId)
        // .then(function (userId) {
        //     registerService.addUserQuestionsAndAnswers(req, userId)
        // })
        .then(registerService.getLastAddedUserId)
        .then(function (userId) {
            registerService.addUserCategories(req, userId)
        })
        .then(function () {
            res.send("Success in creating user");
        })
        .catch(function (err) {
            console.log(err.message);

            registerService.handleError(err, res);
        });
}

module.exports = {
    addUser
};