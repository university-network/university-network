var errorHandler = require('express-error-handler');

function handlerMiddleware(app) {
    return errorHandler({
        server: app,
        handlers: {
            '400': function (err, req, res, next) {
                res.status(400).json(error.errors);
            },
            '500': function (err, req, res, next) {
                res.status(500).json(['Internal error']);
            }
        }
    });

}

module.exports = handlerMiddleware;
