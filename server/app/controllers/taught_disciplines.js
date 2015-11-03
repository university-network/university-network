var taught_disciplines = require('../models/taught_disciplines');

function getAllTaughtDisciplines(req, res, next) {
    taught_disciplines.getAll(function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.json(result.rows);
    });
}

function validateTaughtDiscipline(req, res, next) {
    var schema = {
        body: {
            type: 'object',
            required: ['taught_discipline'],
            properties: {
                taught_discipline: {
                    type: 'object',
                    required: ['teacher_id', 'group_id', 'discipline_id'],
                    properties: {
                        teacher_id: {
                            type: 'int'
                        },
                        group_id: {
                            type: 'int'
                        },
                        discipline_id: {
                            type: 'int'
                        }
                    }
                }
            }
        }
    };

    return validator.middleware(req, next, schema);
}

function createTaughtDiscipline(req, res, next) {
    var params = {
        teacher_id: req.body.taught_discipline.teacher_id,
        group_id: req.body.taught_discipline.group_id,
        discipline_id: req.body.taught_discipline.discipline_id
    };

    taught_disciplines.create(params, function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.status(201);
        res.json(result.rows[0]);
    });
}

module.exports = {
    index: getAllTaughtDisciplines,
    create: [validateTaughtDiscipline, createTaughtDiscipline]
};

