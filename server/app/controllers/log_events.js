var log_events = require('../models/log_events');

function getAllLogEvents(req, res, next) {
    log_events.getAll(function (error, result) {
        if (error) {
            return next(error);
        }
        res.json(result.rows);
    });
}

module.exports = {
    index: getAllLogEvents
};

