var disciplines = require('../models/disciplines');
var validator = require('../../lib/validator');
var disciplineSerializer = require('../serializers/discipline');

function getAllDisciplines(req, res, next) {
    disciplines.getAll(function (error, result) {
        if (error) {
            return next(error);
        }
        res.json(result.rows);
    });
}

function validateGroupSchedule(req, res, next) {
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

function validateDiscipline(req, res, next) {

    var schema = {
        body: {
            type: 'object',
            required: ['discipline'],
            properties: {
                discipline: {
                    type: 'object',
                    required: ['discipline_name'],
                    properties: {
                        discipline_name: {
                            type: 'string',
                            minLength: 3,
                            maxLength: 80
                        }
                    }
                }
            }
        }
    };

    return validator.middleware(req, next, schema);
}

function getGroupSchedule(req, res, next) {

    var params = {
        group_id: req.params.group_id
    };

    disciplines.getSchedule(params, function (error, result) {
        if (error) {
            return next(error);
        }
        res.json(result.rows);
    });
}

function getStudentsSchedule(req, res, next) {
    disciplines.getScheduleForStudent(req.user.id, function (error, result) {
        if (error) {
            return next(error);
        }
        var disciplines = disciplineSerializer.serializeMany(result.rows);
        res.json(disciplines);
    });
}

function getTeachersSchedule(req, res, next) {
    disciplines.getScheduleForTeacher(req.user.id, function (error, result) {
        if (error) {
            return next(error);
        }
        var disciplines = disciplineSerializer.serializeMany(result.rows);
        res.json(disciplines);
    });
}

function createDiscipline(req, res, next) {
    var params = {
        name: req.body.discipline.discipline_name
    };

    disciplines.create(params, function (error, result) {
        if (error) {
            return next(error);
        }
        var createdDiscipline = result.rows[0];
        res.status(201).json(createdDiscipline);
    });
}

module.exports = {
    index: getAllDisciplines,
    create: [validateDiscipline, createDiscipline],
    schedule: [validateGroupSchedule, getGroupSchedule],
    studentSchedule: getStudentsSchedule,
    teacherSchedule: getTeachersSchedule
};
