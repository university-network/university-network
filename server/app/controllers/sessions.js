var authService = require('../services/authentication');
var validator = require('../../lib/validator');
var serializer = require('../serializers/user');

function validateSession(req, res, next) {
    var schema = {
        body: {
            type: 'object',
            required: ['session'],
            properties: {
                session: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            minLength: 3,
                            maxLength: 255
                        },
                        password: {
                            type: 'string',
                            minLength: 8,
                            maxLength: 255
                        }
                    }
                }
            }
        }
    };

    return validator.middleware(req, next, schema);
}

function createSession(req, res, next) {
    var userData = {
        email: req.body.session.email,
        password: req.body.session.password
    };
    authService.validate(userData, function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            var error = new Error;
            error.status = 401;
            return next(error);
        }
        var result = serializer.serializeOne(user);
        res.status(201).json(result);
    });
}

module.exports = {
    create: [validateSession, createSession]
};
