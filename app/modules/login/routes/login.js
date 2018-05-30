const express = require('express');
const router = express.Router();
const loginController = require('../controller/login');

router.post('/', loginController.login);

router.put('/recoverPassword', loginController.recoverUser);

router.post('/questions', loginController.getQuestion);

module.exports = router;