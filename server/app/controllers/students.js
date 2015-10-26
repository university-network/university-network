var students = require('../models/students');
var validator = require('../../lib/validator');

function getAllStudents(req, res, next) {
    students.getAll(function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.json(result.rows);
    });
}

function validateStudent(req, res, next) {
    var schema = {
        query: {
            group_id: {
                notEmpty: validator.messages.notEmpty,
                isInt: validator.messages.isInt
            },
            user_id: {
                notEmpty: validator.messages.notEmpty,
                isInt: validator.messages.isInt
            }
        }
    };

    return validator.middleware(req, next, schema);
}

function createStudent(req, res, next) {
    var params = {
        group_id: req.body.group_id,
        user_id:req.body.user_id
    };

    students.create(params, function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.status(201);
        res.json(result.rows[0]);
    });
}

function validateGroup(req, res, next) {
    var schema = {
        query: {
            group_id: {
                notEmpty: validator.messages.notEmpty,
                isInt: validator.messages.isInt
            }
        }
    };

    return validator.middleware(req, next, schema);
}

function getGroupList(req, res, next) {

    var params = {
        group_id: req.query.group_id
    };

    students.getGroup(params, function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.json(result.rows);
    });
}

module.exports = {
    index: getAllStudents,
    create: [validateStudent, createStudent],
    grouplist: [validateGroup, getGroupList]
};

