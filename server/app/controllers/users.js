var users = require('../models/users');
var validator = require('../../lib/validator');

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
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo,
        access_level: req.body.access_level,
        login: req.body.login,
        password_hash: req.body.password_hash,
    };

    users.create(params, function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.status(201);
        res.json(result.rows[0]);
    });
}

module.exports = {
    index: getAllUsers,
    create: [validateUser, createUser]
};
