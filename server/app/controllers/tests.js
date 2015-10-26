var tests = require('../models/tests');

function getAllTests(req, res, next) {
    tests.getAll(function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.json(result.rows);
    });
}

module.exports = {
    index: getAllTests
};

