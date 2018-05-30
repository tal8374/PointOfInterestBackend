const squel = require("squel");
const DButilsAzureService = require('../../../DB/DButils');

function createReviewQuery(req) {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    return squel.insert()
        .into("Review")
        .set("content", req.body.content)
        .set("date", currentDate)
        .toString();
}

function createReview(req) {
    const query = createReviewQuery(req);

    return DButilsAzureService.Insert(DButilsAzureService.connection, query);
}

function getLastAddedReviewId() {
    return new Promise(function (resolve, reject) {
        console.log("**Get last added review ID**");

        const query = "SELECT TOP 1 * FROM Review ORDER BY reviewId DESC";

        DButilsAzureService.Select(DButilsAzureService.connection, query)
            .then(function (reviewId) {
                console.log("**last added review ID: " + reviewId[0].reviewId + "**");

                resolve(reviewId[0].reviewId);
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

module.exports = {
    createReview,

    getLastAddedReviewId,

    handleError
}