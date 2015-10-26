var actions = require('../models/actions');

function getAllActions(req, res, next) {
    actions.getAll(function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.json(result.rows);
    });
}

module.exports = {
    index: getAllActions
};

