var student_answers = require('../models/student_answers');

function getAllStudentAnswers(req, res, next) {
    student_answers.getAll(function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.json(result.rows);
    });
}

module.exports = {
    index: getAllStudentAnswers
};

