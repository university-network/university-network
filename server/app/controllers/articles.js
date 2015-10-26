var articles = require('../models/articles');

function getAllArticles(req, res, next) {
    users.getAll(function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.json(result.rows);
    });
}

module.exports = {
    index: getAllArticles
};

