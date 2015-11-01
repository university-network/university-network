var users = require('../models/users');
var validator = require('../../lib/validator');
var registration = require('../services/registration');
var serializer = require('../serializers/user');

function getAllUsers(req, res, next) {
    users.getAll(function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.json(result.rows);
    });
}

function validateUser(req, res, next) {
    var schema = {
        body: {
            type: 'object',
            required: ['user'],
            properties: {
                user: {
                    type: 'object',
                    required: ['name', 'email', 'access_level','login', 'password'],
                    properties: {
                        name: {
                            type: 'string',
                            minLength: 3,
                            maxLength: 80
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            minLength: 3,
                            maxLength: 255
                        },
                        access_level: {
                            type: 'int'
                        },
                        login: {
                            type: 'string',
                            minLength: 3,
                            maxLength: 80
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

function createUser(req, res, next) {
    var params = {
        name: req.body.user.name,
        email: req.body.user.email,
        photo: req.body.user.photo,
        access_level: req.body.user.access_level,
        login: req.body.user.login,
        password: req.body.user.password
    };

    registration.register(params, function (err, createdUser) {
        if (err) {
            return next(err);
        }
        var serializedUser = serializer.serializeOne(createdUser);
        res.status(201).json(serializedUser);
    });
}

module.exports = {
    index: getAllUsers,
    create: [validateUser, createUser]
};
