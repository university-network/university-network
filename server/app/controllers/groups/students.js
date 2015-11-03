var studentsModel = require('../../models/students');
var validator = require('../../../lib/validator');

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

    studentsModel.create(params, function (error, result) {
        if (error) {
            return next(error);
        }
        var createdUser = result.rows[0];
        res.status(201).json(createdUser);
    });
}

function validateGroupId(req, res, next) {
    var schema = {
        params: {
            group_id: {
                isInt: validator.messages.isInt
            }
        }
    };

    return validator.middleware(req, next, schema);
}

function getAllByGroupId(req, res, next) {
    var params = {
        group_id: req.params.group_id
    };

    studentsModel.getAllByGroupId(params, function (error, result) {
        if (error) {
            return next(error);
        }
        res.json(result.rows);
    });
}

module.exports = {
    index: [validateGroupId, getAllByGroupId],
    create: [validateStudent, createStudent]
};

