const PointOfInterestService = require('../services/point-of-interest');
const reviewService = require('../../review/services/review');
const visitService = require('../../visit/services/visit');
const rankService = require('../../rank/services/rank');

function createPointOfInterest(req, res) {
    console.log("**POST request for adding a point of interest**");

    PointOfInterestService.findPointOfInterest(req)
        .then(function (PointOfInterests) {
            if (PointOfInterests.length === 0) {
                return PointOfInterestService.createPointOfInterest(req, res);
            } else {
                return Promise.reject(new Error("Creating new point of interest failed. Point of interest is already exists"));
            }
        })
        .then(PointOfInterestService.getLastAddedPointOfInterestId)
        .then(function (pointOfInterestId) {
            PointOfInterestService.addPointOfInterestCategories(req, pointOfInterestId)
        })
        .then(function () {
            res.send("Success in creating point of interest");
        })
        .catch(function (err) {
            console.log(err.message);

            PointOfInterestService.handleError(err, res);
        });
}

function getPointsOfInterest(req, res) {
    console.log("**GET request for getting  all point of interest**");

    PointOfInterestService.getPointsOfInterest()
        .then(function (pointOfInterests) {
            res.send(pointOfInterests);
        })
        .catch(function (err) {
            console.log(err.message);

            PointOfInterestService.handleError(err, res);
        })
}

function getPointsOfInterestByCategory(req, res) {
    console.log("**GET request for getting  all point of interest by category**");

    PointOfInterestService.getPointsOfInterestByCategory(req)
        .then(function (pointOfInterests) {
            res.send(pointOfInterests);
        })
        .catch(function (err) {
            console.log(err.message);

            PointOfInterestService.handleError(err, res);
        })
}

function getPointOfInterest(req, res) {
    console.log("**GET request for point of interest**");

    PointOfInterestService.getPointOfInterest(req)
        .then(function (pointOfInterest) {
            res.send(pointOfInterest);
        })
        .catch(function (err) {
            console.log(err.message);

            PointOfInterestService.handleError(err, res);
        });
}

function updatePointOfInterest(req, res) {
    console.log("**UPDATE request for updating a point of interest**");

    PointOfInterestService.updatePointOfInterest(req)
        .then(function () {
            res.send("Success in updating point of interest");
        })
        .catch(function (err) {
            console.log(err.message);

            PointOfInterestService.handleError(err, res);
        });
}

function deletePointOfInterest(req, res) {
    console.log("**DELETE request for deleting a point of interest**");

    PointOfInterestService.removePointOfInterest(req)
        .then(function () {
            res.send("Success in deleting a point of interest");
        })
        .catch(function (err) {
            console.log(err.message);

            PointOfInterestService.handleError(err, res);
        });
}

function getUserPointOfInterests(req, res) {
    console.log("**GET request for getting all point's of interest of users**");

    PointOfInterestService.getUserPointsOfInterest(req)
        .then(function (pointOfInterests) {
            res.send(pointOfInterests);
        })
        .catch(function (err) {
            console.log(err.message);

            PointOfInterestService.handleError(err, res);
        })
}

function addUserPointOfInterest(req, res) {
    console.log("**POST request for adding point of interest to user**");

    PointOfInterestService.createUserPointOfInterest(req)
        .then(function () {
            res.send("Success in creating user's point of interest");
        })
        .catch(function (err) {
            console.log(err.message);

            PointOfInterestService.handleError(err, res);
        });
}

function deleteUserPointOfInterest(req, res) {
    console.log("**DELETE request for deleting user's point of interest**");

    PointOfInterestService.removeUserPointOfInterest(req)
        .then(function () {
            res.send("Success in deleting users point of interest");
        })
        .catch(function (err) {
            console.log(err.message);

            PointOfInterestService.handleError(err, res);
        });
}

function createUserPointOfInterestRank(req, res) {
    console.log("**POST request for adding rank to point of interest**");

    rankService.createRank(req)
        .then(rankService.getLastAddedRankId)
        .then(function (rankId) {
            return PointOfInterestService.createPointOfInterestRank(req, rankId)
        })
        .then(function () {
            res.send("Success in creating users rank");
        })
        .catch(function (err) {
            console.log(err.message);

            PointOfInterestService.handleError(err, res);
        });
}

function getPointOfInterestRanks(req, res) {
    console.log("**Get request for getting all point of interest's ranks**");

    PointOfInterestService.getPointOfInterestRanks(req)
        .then(function (ranks) {
            res.send(ranks);
        })
        .catch(function (err) {
            console.log(err.message);

            PointOfInterestService.handleError(err, res);
        });
}

function addPointOfInterestCategory(req, res) {
    console.log("**POST request for adding category to point of interest**");

    PointOfInterestService.addPointOfInterestCategory(req)
        .then(function () {
            res.send("Success in adding category to point of interest");
        })
        .catch(function (err) {
            console.log(err.message);

            PointOfInterestService.handleError(err, res);
        });
}

function getPointOfInterestCategories(req, res) {
    console.log("**GET request for getting all categories of point of interest**");

    PointOfInterestService.getPointOfInterestCategories(req)
        .then(function (categories) {
            res.send(categories);
        })
        .catch(function (err) {
            console.log(err.message);

            PointOfInterestService.handleError(err, res);
        })
}

function getPointOfInterestReviews(req, res) {
    console.log("**GET request for getting list of point of interest's reviews**");

    PointOfInterestService.getPointOfInterestReviews(req)
        .then(function (reviews) {
            res.send(reviews);
        })
        .catch(function (err) {
            console.log(err.message);

            PointOfInterestService.handleError(err, res);
        })
}

function getPointOfInterestUserReviews(req, res) {
    console.log("**GET request for getting list of point of interest's reviews**");

    PointOfInterestService.getUserPointOfInterestReviews(req)
        .then(function (reviews) {
            res.send(reviews);
        })
        .catch(function (err) {
            console.log(err.message);

            PointOfInterestService.handleError(err, res);
        })
}

function createPointOfInterestUserReview(req, res) {
    console.log("**POST request for adding review to point of interest**");

    reviewService.createReview(req)
        .then(reviewService.getLastAddedReviewId)
        .then(function (reviewId) {
            return PointOfInterestService.createPointOfInterestUserReview(req, reviewId)
        })
        .then(function () {
            res.send("Success in adding review to point of interest");
        })
        .catch(function (err) {
            console.log(err.message);

            PointOfInterestService.handleError(err, res);
        });
}

function getPointOfInterestVisits(req, res) {
    console.log("**GET request for getting all visits of point of interest**");

    PointOfInterestService.getPointOfInterestVisits(req)
        .then(function (visits) {
            res.send(visits);
        })
        .catch(function (err) {
            console.log(err.message);

            PointOfInterestService.handleError(err, res);
        })
}

function getPointOfInterestUserVisits(req, res) {
    console.log("**GET request for getting list of user's point of interest visits**");

    PointOfInterestService.getUserPointOfInterestVisits(req)
        .then(function (reviews) {
            res.send(reviews);
        })
        .catch(function (err) {
            console.log(err.message);

            PointOfInterestService.handleError(err, res);
        })
}

function addPointOfInterestUserVisit(req, res) {
    console.log("**POST request for adding a visit to point of interest**");

    visitService.createVisit()
        .then(visitService.getLastAddedVisitId)
        .then(function (visitId) {
            return PointOfInterestService.createPointOfInterestUserVisit(req, visitId)
        })
        .then(function () {
            res.send("Success in adding visit to point of interest");
        })
        .catch(function (err) {
            console.log(err.message);

            PointOfInterestService.handleError(err, res);
        });
}


module.exports = {
    createPointOfInterest,

    getPointsOfInterest,

    getPointOfInterest,

    updatePointOfInterest,

    deletePointOfInterest,

    getUserPointOfInterests,

    addUserPointOfInterest,

    deleteUserPointOfInterest,

    createUserPointOfInterestRank,

    getPointOfInterestRanks,

    addPointOfInterestCategory,

    getPointOfInterestCategories,

    getPointOfInterestReviews,

    getPointOfInterestUserReviews,

    createPointOfInterestUserReview,

    getPointOfInterestVisits,

    getPointOfInterestUserVisits,

    addPointOfInterestUserVisit,

    getPointsOfInterestByCategory
};