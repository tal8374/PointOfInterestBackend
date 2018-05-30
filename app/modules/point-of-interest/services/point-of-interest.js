const squel = require("squel");
const DButilsAzureService = require('../../../DB/DButils');

function createPointOfInterestQuery(req) {
    return squel.insert()
        .into("PointOfInterest")
        .set("name", req.body.name)
            .set("image", req.body.image)
        .set("description", req.body.description)
        .toString();
}

function createPointOfInterest(req) {
    const query = createPointOfInterestQuery(req);

    return DButilsAzureService.Insert(DButilsAzureService.connection, query);
}

function createUserPointOfInterestQuery(req) {
    const pointOfInterestId = req.params.pointOfInterestId;
    const userId = req.params.userId;

    return squel.insert()
        .into("UserPointOfInterest")
        .set("pointOfInterestId", pointOfInterestId)
        .set("userId", userId)
        .toString();
}

function createUserPointOfInterest(req) {
    const query = createUserPointOfInterestQuery(req);

    return DButilsAzureService.Insert(DButilsAzureService.connection, query);
}

function getPointsOfInterestQuery() {
    return 'Select * FROM PointOfInterest';
}

function getPointsOfInterest() {
    const query = getPointsOfInterestQuery();

    return DButilsAzureService.Select(DButilsAzureService.connection, query);
}

function getPointsOfInterestByCategoryQuery(req) {
    const categoryId = req.params.categoryId;

    return 'Select * FROM PointOfInterestCategory' +
        " INNER JOIN PointOfInterest ON PointOfInterestCategory.pointOfInterestId=PointOfInterest.pointOfInterestId" +
        " INNER JOIN Category ON Category.categoryId=PointOfInterestCategory.categoryId" +
        ' WHERE PointOfInterestCategory.categoryId=' + categoryId;
}

function getPointsOfInterestByCategory(req) {
    const query = getPointsOfInterestByCategoryQuery(req);

    return DButilsAzureService.Select(DButilsAzureService.connection, query);
}

function getUserPointsOfInterestQuery(req) {
    const userId = req.params.userId;

    return 'Select * FROM UserPointOfInterest' +
        " INNER JOIN PointOfInterest ON PointOfInterest.pointOfInterestId=UserPointOfInterest.pointOfInterestId" +
        ' WHERE UserPointOfInterest.userId=' + userId;
}

function getUserPointsOfInterest(req) {
    const query = getUserPointsOfInterestQuery(req);

    return DButilsAzureService.Select(DButilsAzureService.connection, query);
}

function getPointOfInterestQuery(req) {
    const pointOfInterestId = req.params.pointOfInterestId;

    return 'Select * from PointOfInterest ' +
        'WHERE PointOfInterest.pointOfInterestId=' + pointOfInterestId;
}

function getPointOfInterest(req) {
    const query = getPointOfInterestQuery(req);

    return DButilsAzureService.Select(DButilsAzureService.connection, query);
}

function updatePointOfInterestQuery(req) {
    const pointOfInterestId = req.params.pointOfInterestId;

    return squel.update()
        .table("PointOfInterest")
        .set("name", req.body.name)
        .set("image", req.body.image)
        .set("description", req.body.description)
        .where("pointOfInterestId = " + pointOfInterestId)
        .toString();
}

function updatePointOfInterest(req) {
    const query = updatePointOfInterestQuery(req);

    return DButilsAzureService.Update(DButilsAzureService.connection, query);
}

function removePointOfInterestQuery(req) {
    const pointOfInterestId = req.params.pointOfInterestId;

    return "DELETE FROM PointOfInterest WHERE pointOfInterestId=" + pointOfInterestId;
}

function removePointOfInterest(req) {
    const query = removePointOfInterestQuery(req);

    return DButilsAzureService.Delete(DButilsAzureService.connection, query);
}

function createPointOfInterestRankQuery(req, rankId) {
    const pointOfInterestId = req.params.pointOfInterestId;
    const userId = req.params.userId;

    return squel.insert()
        .into("PointOfInterestUserRank")
        .set("rankId", rankId)
        .set("pointOfInterestId", pointOfInterestId)
        .set("userId", userId)
        .toString();
}

function createPointOfInterestRank(req, rankId) {
    const query = createPointOfInterestRankQuery(req, rankId);

    return DButilsAzureService.Insert(DButilsAzureService.connection, query);
}

function addPointOfInterestCategoryQuery(req) {
    const pointOfInterestId = req.params.pointOfInterestId;
    const categoryId = req.body.categoryId;

    return squel.insert()
        .into("PointOfInterestCategory")
        .set("categoryId", categoryId)
        .set("pointOfInterestId", pointOfInterestId)
        .toString();
}

function addPointOfInterestCategory(req) {
    const query = addPointOfInterestCategoryQuery(req);

    return DButilsAzureService.Insert(DButilsAzureService.connection, query);
}

function removeUserPointOfInterestQuery(req) {
    const userId = req.params.userId;
    const pointOfInterestId = req.params.pointOfInterestId;

    return "DELETE FROM UserPointOfInterest " +
        "WHERE userId=" + userId +
        "AND WHERE UserPointOfInterest.pointOfInterestId=" + pointOfInterestId;
}

function removeUserPointOfInterest(req) {
    const query = removeUserPointOfInterestQuery(req);

    return DButilsAzureService.Delete(DButilsAzureService.connection, query);
}

function getPointOfInterestCategoriesQuery(req) {
    const pointOfInterestId = req.params.pointOfInterestId;

    return 'Select * FROM PointOfInterestCategory' +
        ' INNER JOIN Category ON Category.categoryId = PointOfInterestCategory.categoryId ' +
        ' WHERE PointOfInterestCategory.pointOfInterestId=' + pointOfInterestId;
}

function getPointOfInterestCategories(req) {
    const query = getPointOfInterestCategoriesQuery(req);

    return DButilsAzureService.Select(DButilsAzureService.connection, query);
}

function createPointOfInterestReviewQuery(req, reviewId) {
    const pointOfInterestId = req.params.pointOfInterestId;
    const userId = req.params.userId;

    return squel.insert()
        .into("PointOfInterestUserReview")
        .set("reviewId  ", reviewId)
        .set("pointOfInterestId", pointOfInterestId)
        .set("userId", userId)
        .toString();
}

function createPointOfInterestUserReview(req, reviewId) {
    const query = createPointOfInterestReviewQuery(req, reviewId);

    return DButilsAzureService.Insert(DButilsAzureService.connection, query);
}

function createPointOfInterestVisitQuery(req, visitId) {
    const pointOfInterestId = req.params.pointOfInterestId;
    const userId = req.params.userId;

    return squel.insert()
        .into("PointOfInterestUserVisit")
        .set("visitId  ", visitId)
        .set("pointOfInterestId", pointOfInterestId)
        .set("userId", userId)
        .toString();
}

function createPointOfInterestUserVisit(req, visitId) {
    const query = createPointOfInterestVisitQuery(req, visitId);

    return DButilsAzureService.Insert(DButilsAzureService.connection, query);
}

function getPointOfInterestVisitsQuery(req) {
    const pointOfInterestId = req.params.pointOfInterestId;

    return 'Select * FROM PointOfInterestUserVisit' +
        ' INNER JOIN Visit ON Visit.visitId = PointOfInterestUserVisit.visitId ' +
        ' WHERE PointOfInterestUserVisit.pointOfInterestId=' + pointOfInterestId;
}

function getPointOfInterestVisits(req) {
    const query = getPointOfInterestVisitsQuery(req);

    return DButilsAzureService.Select(DButilsAzureService.connection, query);
}

function getUserPointOfInterestReviewsQuery(req) {
    const pointOfInterestId = req.params.pointOfInterestId;
    const userId = req.params.userId;

    return 'Select * FROM PointOfInterestUserReview' +
        ' INNER JOIN Review ON Review.reviewId = PointOfInterestUserReview.reviewId ' +
        ' INNER JOIN Users ON Users.userId = PointOfInterestUserReview.userId ' +
        ' WHERE PointOfInterestUserReview.pointOfInterestId=' + pointOfInterestId + " AND PointOfInterestUserReview.userId=" + userId;
}

function getUserPointOfInterestReviews(req) {
    const query = getUserPointOfInterestReviewsQuery(req);

    return DButilsAzureService.Select(DButilsAzureService.connection, query);
}

function getUserPointOfInterestVisitsQuery(req) {
    const pointOfInterestId = req.params.pointOfInterestId;
    const userId = req.params.userId;

    return 'Select * FROM PointOfInterestUserVisit' +
        ' INNER JOIN Visit ON Visit.visitId = PointOfInterestUserVisit.visitId ' +
        ' INNER JOIN Users ON Users.userId = PointOfInterestUserVisit.userId ' +
        ' WHERE PointOfInterestUserVisit.pointOfInterestId=' + pointOfInterestId + " AND PointOfInterestUserVisit.userId=" + userId;
}

function getUserPointOfInterestVisits(req) {
    const query = getUserPointOfInterestVisitsQuery(req);

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

function getPointOfInterestRanksQuery(req) {
    const pointOfInterestId = req.params.pointOfInterestId;

    return 'Select * FROM PointOfInterestUserRank' +
        ' INNER JOIN Rank ON Rank.rankId = PointOfInterestUserRank.rankId' +
        ' WHERE PointOfInterestUserRank.pointOfInterestId=' + pointOfInterestId ;
}

function getPointOfInterestRanks(req) {
    const query = getPointOfInterestRanksQuery(req);

    return DButilsAzureService.Select(DButilsAzureService.connection, query);
}

function getPointOfInterestReviewsQuery(req) {
    const pointOfInterestId = req.params.pointOfInterestId;

    return 'Select * FROM PointOfInterestUserReview' +
        ' INNER JOIN Review ON Review.reviewId = PointOfInterestUserReview.reviewId ' +
        ' WHERE PointOfInterestUserReview.pointOfInterestId=' + pointOfInterestId;
}

function getPointOfInterestReviews(req) {
    const query = getPointOfInterestReviewsQuery(req);

    return DButilsAzureService.Select(DButilsAzureService.connection, query);
}

function addPointOfInterestCategoriesQuery(req, pointOfInterestId) {
    let query = "insert into PointOfInterestCategory (pointOfInterestId, categoryId) ";
    let categories = "'" + req.body.categories.substring(1, req.body.categories.length - 1) + "'";

    categories = categories.substring(1, categories.length - 1).split(",");

    categories.forEach(function (categoryId) {
        query = query + "SELECT '" + pointOfInterestId + "', '" + categoryId + "' ";
        query = query + "UNION ALL ";
    });

    query = query.substr(0, query.lastIndexOf('U'));

    return query;
}

function addPointOfInterestCategories(req, pointOfInterestId) {
    return new Promise(function () {
        console.log("** Add point of interest categories **");

        const query = addPointOfInterestCategoriesQuery(req, pointOfInterestId);

        return DButilsAzureService.Insert(DButilsAzureService.connection, query);
    });
}

function getLastAddedPointOfInterestId() {
    return new Promise(function (resolve, reject) {
        console.log("**Get last added point of interest ID**");

        const query = "SELECT TOP 1 * FROM PointOfInterest ORDER BY pointOfInterestId DESC";

        DButilsAzureService.Select(DButilsAzureService.connection, query)
            .then(function (pointOfInterestId) {
                console.log("**last added rank ID: " + pointOfInterestId[0].pointOfInterestId + "**");

                resolve(pointOfInterestId[0].pointOfInterestId);
            })
            .catch(function (err) {
                console.log(err.message);

                reject(err);
            })
    });
}

function findPointOfInterestQuery(req) {
    const name = "'" + req.body.name + "'";

    return "Select * FROM PointOfInterest WHERE name=" + name;
}

function findPointOfInterest(req) {
    const query = findPointOfInterestQuery(req);

    return DButilsAzureService.Select(DButilsAzureService.connection, query);
}


module.exports = {
    createPointOfInterest,

    getPointOfInterest,

    getPointsOfInterest,

    createPointOfInterestRank,

    removeUserPointOfInterest,

    addPointOfInterestCategory,

    getPointOfInterestCategories,

    createPointOfInterestUserReview,

    createPointOfInterestUserVisit,

    getPointOfInterestVisits,

    getUserPointsOfInterest,

    removePointOfInterest,

    createUserPointOfInterest,

    getUserPointOfInterestReviews,

    updatePointOfInterest,

    getPointOfInterestRanks,

    getPointOfInterestReviews,

    getLastAddedPointOfInterestId,

    addPointOfInterestCategories,

    findPointOfInterest,

    getUserPointOfInterestVisits,

    getPointsOfInterestByCategory,

    handleError
};