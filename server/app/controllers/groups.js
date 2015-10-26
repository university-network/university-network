var groups = require('../models/groups');

function getAllGroups(req, res, next) {
    groups.getAll(function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.json(result.rows);
    });
}

module.exports = {
    index: getAllGroups
};

