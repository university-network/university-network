var students = require('../models/students');
var validator = require('../../lib/validator');

function getAllStudents(req, res, next) {
    students.getAll(function (error, result) {
        if (error) {
            return next(error);
        }
        res.json(result.rows);
    });
}

function validateStudent(req, res, next) {
    var schema = {
        body: {
            type: 'object',
            required: ['student'],
            properties: {
                student: {
                    type: 'object',
                    required: ['user_id', 'group_id'],
                    properties: {
                        group_id: {
                            type: 'int'
                        },
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

function createStudent(req, res, next) {
    var params = {
        group_id: req.body.student.group_id,
        user_id: req.body.student.user_id
    };

    students.create(params, function (error, result) {
        if (error) {
            return next(error);
        }
        var createdStudent = result.rows[0];
        res.status(201).json(createdStudent);
    });
}

function validateGroup(req, res, next) {
    var schema = {
        params: {
            type: 'object',
            required: ['group_id'],
            properties: {
                group_id: {
                    type: 'int'
                }
            }
        }
    };

    return validator.middleware(req, next, schema);
}

function getAllByGroupId(req, res, next) {

    var params = {
        group_id: req.params.group_id
    };

    students.getAllByGroupId(params, function (error, result) {
        if (error) {
            return next(error);
        }
        res.json(result.rows);
    });
}

function getStudentsGroup(req, res, next) {
    students.getStudentsGroup(req.user.id, function (error, result) {
        if (error) {
            return next(error);
        }
        res.json(result.rows);
    });
}

module.exports = {
    index: getAllStudents,
    create: [validateStudent, createStudent],
    getStudentsByGroup: [validateGroup, getAllByGroupId],
    getStudentsGroup: getStudentsGroup
};

