const squel = require("squel");
const DButilsAzureService = require('../../../DB/DButils');

function addCategoryQuery(req) {
    return squel.insert()
        .into("Category")
        .set("name", req.body.name)
        .toString();
}

function addCategory(req) {
    const query = addCategoryQuery(req);

    return DButilsAzureService.Insert(DButilsAzureService.connection, query);
}

function getCategoriesQuery() {
    return 'Select * FROM Category';
}

function getCategories() {
    const query = getCategoriesQuery();

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

function removeCategoryQuery(req) {
    const categoryId = req.params.categoryId;

    return "DELETE FROM Category WHERE categoryId=" + categoryId;
}

function removeCategory(req) {
    const query = removeCategoryQuery(req);

    return DButilsAzureService.Delete(DButilsAzureService.connection, query);
}

function updateCategoryQuery(req) {
    const categoryId = req.params.categoryId;

    return squel.update()
        .table("Category")
        .set("name", req.body.name)
        .where("categoryId = " + categoryId)
        .toString();
}

function updateCategory(req) {
    const query = updateCategoryQuery(req);

    return DButilsAzureService.Update(DButilsAzureService.connection, query);
}

function getCategoryQuery(req) {
    const categoryId = req.params.categoryId;

    return 'Select * from Category ' +
        'WHERE Category.categoryId=' + categoryId;
}

function getCategory(req) {
    const query = getCategoryQuery(req);

    return DButilsAzureService.Select(DButilsAzureService.connection, query);
}


module.exports = {
    addCategory,

    getCategories,

    handleError,

    removeCategory,

    updateCategory,

    getCategory
};