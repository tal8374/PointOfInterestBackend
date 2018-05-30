var squel = require("squel");
var DButilsAzureService = require('../../../DB/DButils');

function createUserQuery(req) {
    console.dir(req.body);

    return squel.insert()
        .into("Users")
        .set("userName", req.body.userName)
        .set("password", req.body.password)
        .set("firstName", req.body.firstName)
        .set("lastName", req.body.lastName)
        .set("city", req.body.city)
        .set("country", req.body.country)
        .set("mail", req.body.mail)
        .set("question1", req.body.question1)
        .set("question2", req.body.question2)
        .set("answer1", req.body.answer1)
        .set("answer2", req.body.answer2)
        .toString();
}

function createUser(req, res) {
    return findUser(req).then(function (users) {
        // if (users.length !== 0) {
        //     return Promise.reject(new Error("Creating new user failed. User is already exists"));
        // }
        if (!isRegistrationInputValid(req, res)) {
            return Promise.reject(new Error("Registration's values are not valid"));
        }
        const query = createUserQuery(req);

        return DButilsAzureService.Insert(DButilsAzureService.connection, query);
    });

}

function addUserCategoriesQuery(req, userId) {
    let query = "insert into UserCategory (userId, categoryId) ";
    let categories = "'" + req.body.categories.substring(1, req.body.categories.length - 1) + "'";

    categories = categories.substring(1, categories.length - 1).split(",");

    categories.forEach(function (categoryId) {
        query = query + "SELECT '" + userId + "', '" + categoryId + "' ";
        query = query + "UNION ALL ";
    });

    query = query.substr(0, query.lastIndexOf('U'));

    return query;
}

function addUserCategories(req, userId) {
    console.log("** Add user categories **");

    const query = addUserCategoriesQuery(req, userId);

    return DButilsAzureService.Insert(DButilsAzureService.connection, query);
}
//
// function addUserQuestionsAndAnswersQuery(req, userId) {
//     let query = "insert into UserQuestionAnswer (userId, questionId, answer) ";
//     let questions = "'" + req.body.questions.substring(1, req.body.questions.length - 1) + "'";
//     let answers = "'" + req.body.answers.substring(1, req.body.answers.length - 1) + "'";
//
//     questions = questions.substring(1, questions.length - 1).split(",");
//     answers = answers.substring(1, answers.length - 1).split(",");
//
//     const numOfQuestionAnswers = answers.length;
//
//     console.log("*******");
//     console.log(questions);
//     console.log(answers);
//
//     for (let i = 0; i < numOfQuestionAnswers; i++) {
//         query = query + "SELECT '" + userId + "', '" + questions[i] + "', '" + answers[i] + "' ";
//         query = query + "UNION ALL ";
//     }
//
//     query = query.substr(0, query.lastIndexOf('U'));
//
//     return query;
// }
//
// function addUserQuestionsAndAnswers(req, userId) {
//     return getLastAddedUserId().then(function (userId) {
//         console.log("** Add user questions and answers **");
//
//         const query = addUserQuestionsAndAnswersQuery(req, userId);
//
//         return DButilsAzureService.Insert(DButilsAzureService.connection, query);
//     });
// }

function getLastAddedUserId() {
    return new Promise(function (resolve, reject) {
        console.log("**Get last added user ID**");

        const query = "SELECT TOP 1 * FROM Users ORDER BY userId DESC";

        DButilsAzureService.Select(DButilsAzureService.connection, query)
            .then(function (recordId) {
                console.log("**last added rank ID: " + recordId[0].userId + "**");

                resolve(recordId[0].userId);
            })
            .catch(function (err) {
                console.log(err.message);

                reject(err);
            })
    });
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

function isRegistrationInputValid(req, res) {
    return isUserNameValid(req, res) && isUserPasswordValid(req, res);
}

function isUserNameValid(req, res) {
    const userName = req.body.userName;

    if (!userName || userName.length > 8 || userName.length < 3) {
        console.log("** User name is not valid, must be between 3 to 8 characters **");

        const reason = "User name is not valid, must be between 3 to 8 characters ";

        res.status(400).send(reason);
    }

    if (!/^[a-zA-Z]+$/.test(userName)) {
        console.log("** User name is not valid, must contain only letters **");

        const reason = "User name is not valid, must contain only letters ";

        res.status(400).send(reason);
    }

    return true;
}

function isUserPasswordValid(req, res) {
    const password = req.body.password;

    if (!password || password.length > 10 || password.length < 5) {
        console.log("** Password is not valid, must be between 3 to 8 characters **");

        const reason = "Password is not valid, must be between 3 to 8 characters ";

        res.status(400).send(reason);
    }

    if (!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(password)) {
        console.log("** User name is not valid, must contain combination of numbers and  letters **");

        const reason = "Password is not valid, must contain combination of numbers and  letters ";

        res.status(400).send(reason);
    }

    return true;
}

function findUserQuery(req) {
    const userName = "'" + req.body.userName + "'";
    const mail = "'" + req.body.mail + "'";

    return "Select * FROM Users WHERE userName=" + userName + " AND mail=" + mail;
}

function findUser(req) {
    const query = findUserQuery(req);

    return DButilsAzureService.Select(DButilsAzureService.connection, query);
}

module.exports = {
    createUser,

    addUserCategories,

    findUser,

    // addUserQuestionsAndAnswers,

    getLastAddedUserId,

    handleError,
};
