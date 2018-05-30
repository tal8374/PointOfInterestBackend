const loginService = require('../services/login');

function login(req, res) {
    console.log("**POST request for login**");

    loginService.loginUser(req)
        .then(function (respond) {
            if (respond.length === 0) {
                res.status(400).send("Login failed, one of the username details is wrong");
            } else {
                loginService.sendToken(respond[0], res)
            }
        })
        .catch(function (err) {
            console.log(err.message);

            loginService.handleError(err, res);
        });
}

function recoverUser(req, res) {
    console.log("** PUT request for recover Password **");

    loginService.findUser(req)
        .then(function (user) {
            console.dir(user.length);

            if (user.length >= 1) {
                return loginService.recoverUser(req);
            } else {
                return Promise.reject(new Error("Recover failed, answer doesn't match question or user name does not exists"));
            }
        })
        .then(function () {
            res.send("Recover user's password succeeded");
        })
        .catch(function (err) {
            console.log(err.message);

            loginService.handleError(err, res);
        });
}

function getQuestion(req, res) {
    console.log("**GET request for user's question**");

    loginService.getUserQuestion(req)
        .then(function (questions) {
            if (questions.length === 0) {
                res.status(400).send("Getting user's question request has failed. User is not exists");
            } else {
                res.status(200).send(questions);
            }
        })
        .catch(function (err) {
            console.log(err.message);

            loginService.handleError(err, res);
        });
}

module.exports = {
    login,

    recoverUser,

    getQuestion
};