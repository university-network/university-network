var jwt = require('jsonwebtoken');
var config = require('../config/index');

function authMiddleware(req, res, next) {
    var token = req.headers.authorization;

    if (!token) {
        var error = new Error('Authorization header is missing!');
        error.status = 401;
        return next(error, req, res);
    }

    jwt.verify(token, config.jwt.secret, function (err, decoded) {
        if (err) {
            var error = new Error('Invalid token!');
            error.status = 401;
            return next(error, req, res);
        }

        req.user = {
            id: decoded.id,
            role: decoded.role
        };
        next(null, req, res);
    });
}

module.exports = authMiddleware;
