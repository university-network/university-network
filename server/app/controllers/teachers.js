var teachers = require('../models/teachers');
var validator = require('../../lib/validator');

function getAllTeachers(req, res, next) {
    teachers.getAll(function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.json(result.rows);
    });
}

function validateStudentsTeachers(req, res, next) {
    var schema = {
        query: {
            type: 'object',
            required: ['teacher'],
            properties: {
                teacher: {
                    type: 'object',
                    required: ['group_id'],
                    properties: {
                        group_id: {
                            type: 'int'
                        }
                    }
                }
            }
        }
    };

    return validator.middleware(req, next, schema);
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

function getStudentsTeachers(req, res, next) {

    var params = {
        group_id: req.query.teacher.group_id
    };

    teachers.getStudentsTeachers(params, function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.json(result.rows);
    });
}

function createTeacher(req, res, next) {
    var params = {
        user_id: req.body.teacher.user_id
    };

    teachers.create(params, function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.status(201);
        res.json(result.rows[0]);
    });
}

module.exports = {
    index: getAllTeachers,
    myTeachers: [validateStudentsTeachers, getStudentsTeachers],
    create: [validateTeacher, createTeacher]
};

