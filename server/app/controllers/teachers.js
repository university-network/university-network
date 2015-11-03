var teachers = require('../models/teachers');
var validator = require('../../lib/validator');

function getAllTeachers(req, res, next) {
    teachers.getAll(function (error, result) {
        if (error) {
            return next(error);
        }
        res.json(result.rows);
    });
}

function validateTeacher(req, res, next) {
    var schema = {
        body: {
            type: 'object',
            required: ['teacher'],
            properties: {
                teacher: {
                    type: 'object',
                    required: ['user_id'],
                    properties: {
                        user_id: {
                            type: 'int'
                        }
                    }
                }
            }
        }
    };

    return validator.middleware(req, next, schema);
}

function createTeacher(req, res, next) {
    var params = {
        user_id: req.body.teacher.user_id
    };

    teachers.create(params, function (error, result) {
        if (error) {
            return next(error);
        }
        var createdTeacher = result.rows[0];
        res.status(201).json(createdTeacher);
    });
}

module.exports = {
    index: getAllTeachers,
    create: [validateTeacher, createTeacher]
};

