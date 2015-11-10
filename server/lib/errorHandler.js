var expressErrorHandler = require('express-error-handler');

function errorHandler(app) {
    var httpHandler = expressErrorHandler({
        server: app,
        handlers: {
            '400': handler400,
            '401': handler401,
            '404': handler404,
            '409': handler409,
            '422': handler422,
            '500': handler500
        }
    });
    return [databaseHandler, httpHandler];
}

function databaseHandler(err, req, res, next) {
    if (err.code == '23505') {
        var error = new Error('Duplication error');
        error.status = 422;
        return next(error);
    }
    next(err);
}

function handler400(err, req, res, next) {
    if (err.hasOwnProperty('errors')) {
        return res.status(400).json(err.errors);
    }
    var message = err.message || 'Bad request';
    res.status(400).json([message]);
}

function handler401(err, req, res, next) {
    var message = err.message || 'Unauthorized';
    res.status(401).json([message]);
}

function handler404(err, req, res, next) {
    var message = err.message || 'Not found';
    res.status(404).json([message]);
}

function handler409(err, req, res, next) {
    var message = err.message || 'Conflict';
    res.status(409).json([message]);
}

function handler422(err, req, res, next) {
    var message = err.message || 'Unprocessable entity';
    res.status(422).json([message]);
}

function handler500(err, req, res, next) {
    var message = err.message || 'Internal error';
    res.status(500).json([message]);
}

module.exports = errorHandler;
