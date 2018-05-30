const express = require('express');
const router = express.Router();
const pointOfInterestController = require('../controller/point-of-interest');

router
    .post('/', pointOfInterestController.createPointOfInterest);

router
    .get('/list', pointOfInterestController.getPointsOfInterest);

router
    .get('/category/:categoryId/list', pointOfInterestController.getPointsOfInterestByCategory);

router
    .get('/:pointOfInterestId', pointOfInterestController.getPointOfInterest)
    .put('/:pointOfInterestId', pointOfInterestController.updatePointOfInterest)
    .delete('/:pointOfInterestId', pointOfInterestController.deletePointOfInterest);

router
    .get('/user/:userId/list', pointOfInterestController.getUserPointOfInterests);

router
    .post('/:pointOfInterestId/user/:userId', pointOfInterestController.addUserPointOfInterest)
    .delete('/:pointOfInterestId/user/:userId', pointOfInterestController.deleteUserPointOfInterest);

router
    .post('/:pointOfInterestId/user/:userId/rank', pointOfInterestController.createUserPointOfInterestRank);

router
    .get('/:pointOfInterestId/rank/list', pointOfInterestController.getPointOfInterestRanks);

router
    .post('/:pointOfInterestId/category', pointOfInterestController.addPointOfInterestCategory);

router
    .get('/:pointOfInterestId/category/list', pointOfInterestController.getPointOfInterestCategories);

router
    .get('/:pointOfInterestId/review/list', pointOfInterestController.getPointOfInterestReviews);

router
    .get('/:pointOfInterestId/review/user/:userId/list', pointOfInterestController.getPointOfInterestUserReviews);

router
    .post('/:pointOfInterestId/review/user/:userId', pointOfInterestController.createPointOfInterestUserReview);

router
    .get('/:pointOfInterestId/visit/list', pointOfInterestController.getPointOfInterestVisits);

router
    .get('/:pointOfInterestId/visit/user/:userId/list', pointOfInterestController.getPointOfInterestUserVisits);

router
    .post('/:pointOfInterestId/visit/user/:userId', pointOfInterestController.addPointOfInterestUserVisit);

module.exports = router;