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

function validateTeachers(req, res, next) {
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

function getStudentsTeachers(req, res, next) {

    var params = {
        group_id: req.query.group_id
    };

    teachers.getStudentsTeachers(params, function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.json(result.rows);
    });
}

module.exports = {
    index: getAllTeachers,
    myTeachers:[validateTeachers,getStudentsTeachers]
};

