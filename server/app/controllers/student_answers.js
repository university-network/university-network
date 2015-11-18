var student_answers = require('../models/student_answers');

function getAllStudentAnswers(req, res, next) {
    student_answers.getAll(function (error, result) {
        if (error) {
            return next(error);
        }
        res.json(result.rows);
    });
}

function validateAnswer(req, res, next) {
    var schema = {
        body: {
            type: 'object',
            required: ['student_answer'],
            properties: {
                student_answer: {
                    type: 'object',
                    required: ['test_id', 'question_id', 'answer'],
                    properties: {
                        test_id: {
                            type: 'int'
                        },
                        question_id: {
                            type: 'int'
                        },
                        answer: {
                            type: 'string',
                            minLength: 1,
                            maxLength: 50
                        }
                    }
                }
            }
        }
    };

    return validator.middleware(req, next, schema);
}

function createAnswer(req, res, next) {
    var params = {
        test_id: req.body.student_answer.test_id,
        question_id: req.body.student_answer.question_id,
        answer: req.body.student_answer.answer
    };

    student_answers.create(params, function (error, result) {
        if (error) {
            return next(error);
        }
        var createdAnswer = result.rows[0];
        res.status(201).json(createdAnswer);
    });
}

module.exports = {
    index: getAllStudentAnswers,
    create:[validateAnswer, createAnswer]
};

