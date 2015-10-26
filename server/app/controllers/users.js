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

function validateUser(req,res,next) {
    var schema = {
        query: {
            name: {
                notEmpty: validator.messages.notEmpty,
                isAlpha: validator.messages.isAlpha
            },
            email:{
                notEmpty: validator.messages.notEmpty,
                isEmail: validator.messages.isEmail
            },
            photo:{},
            access_level:
            {
                notEmpty: validator.messages.notEmpty,
                isInt: validator.messages.isInt
            },
            login: {
                notEmpty: validator.messages.notEmpty,
                isAlpha: validator.messages.isAlpha
            },
            password_hash:{
                notEmpty: validator.messages.notEmpty
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
