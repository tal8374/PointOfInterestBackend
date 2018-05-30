const express = require('express');
const router = express.Router();
const categorieController = require('../controller/category');

router
    .post('/', categorieController.addCategory);

router
    .get('/list', categorieController.getCategories);

router
    .get('/:categoryId', categorieController.getCategory)
    .delete('/:categoryId', categorieController.deleteCategory)
    .put('/:categoryId', categorieController.updateCategory);

module.exports = router;