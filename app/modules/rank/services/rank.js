const squel = require("squel");
const DButilsAzureService = require('../../../DB/DButils');

function createRankQuery(req) {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const rank = req.body.rank;

    return squel.insert()
        .into("Rank")
        .set("rank", rank)
        .set("date", currentDate)
        .toString();
}

function createRank(req) {
    const query = createRankQuery(req);

    return DButilsAzureService.Insert(DButilsAzureService.connection, query);
}

function getLastAddedRankId() {
    return new Promise(function (resolve, reject) {
        console.log("**Get last added rank ID**");

        const query = "SELECT TOP 1 * FROM Rank ORDER BY rankId DESC";

        DButilsAzureService.Select(DButilsAzureService.connection, query)
            .then(function (reviewId) {
                console.log("**last added rank ID: " + reviewId[0].rankId + "**");

                resolve(reviewId[0].rankId);
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
    createRank,

    getLastAddedRankId,

    handleError
}