const express = require('express');
const router = express.Router();
const countryController = require('../controller/country');

router
    .get('/list', countryController.getCountries);

module.exports = router;