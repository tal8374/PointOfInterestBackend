const squel = require("squel");
const DButilsAzureService = require('../../../DB/DButils');

function createVisitQuery() {
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    return squel.insert()
        .into("Visit")
        .set("date", currentDate)
        .toString();
}

function createVisit() {
    const query = createVisitQuery();

    return DButilsAzureService.Insert(DButilsAzureService.connection, query);
}


function getLastAddedVisitId() {
    return new Promise(function (resolve, reject) {
        console.log("**Get last added visit ID**");

        const query = "SELECT TOP 1 visitId FROM Visit ORDER BY visitId DESC";

        DButilsAzureService.Select(DButilsAzureService.connection, query)
            .then(function (visitId) {
                console.log("**last added visit ID: " + visitId[0].visitId + "**");

                resolve(visitId[0].visitId);
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
    createVisit,

    getLastAddedVisitId,

    handleError
}