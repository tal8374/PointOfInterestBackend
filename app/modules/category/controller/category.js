const categorieService = require('../services/category');

function addCategory(req, res) {
    console.log("**POST request for creating category**");

    categorieService.addCategory(req)
        .then(function () {
            res.send("Success in adding a category");
        })
        .catch(function (err) {
            console.log(err.message);

            categorieService.handleError(err, res)
        });
}

function getCategories(req, res) {
    console.log("**GET request for getting all categories**");

    categorieService.getCategories(req)
        .then(function (categories) {
            res.send(categories);
        })
        .catch(function (err) {
            console.log("**Error in add category:**");

            categorieService.handleError(err, res)
        });
}

function getCategory(req, res) {
    console.log("**GET request for category**");

    categorieService.getCategory(req)
        .then(function (category) {
            res.send(category);
        })
        .catch(function (err) {
            console.log(err.message);

            categorieService.handleError(err, res);
        });
}

function deleteCategory(req, res) {
    console.log("**DELETE request for deleting a category**");

    categorieService.removeCategory(req)
        .then(function () {
            res.send("Success in delete category");
        })
        .catch(function (err) {
            console.log(err.message);

            categorieService.handleError(err, res);
        });
}

function updateCategory(req, res) {
    console.log("**UPDATE request for updating a category**");

    categorieService.updateCategory(req)
        .then(function () {
            res.send("Success in updating category");
        })
        .catch(function (err) {
            console.log(err.message);

            categorieService.handleError(err, res);
        });
}

module.exports = {
    addCategory,

    getCategories,

    getCategory,

    deleteCategory,

    updateCategory
};