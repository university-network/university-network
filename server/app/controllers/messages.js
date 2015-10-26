var messages = require('../models/messages');

function getAllMessages(req, res, next) {
    messages.getAll(function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.json(result.rows);
    });
}

module.exports = {
    index: getAllMessages
};

