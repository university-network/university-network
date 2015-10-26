var taught_disciplines = require('../models/taught_disciplines');

function getAllTaughtDisciplines(req, res, next) {
    taught_disciplines.getAll(function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.json(result.rows);
    });
}

module.exports = {
    index: getAllTaughtDisciplines
};

