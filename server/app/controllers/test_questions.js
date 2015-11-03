var test_questions = require('../models/test_questions');

function getAllTestQuestions(req, res, next) {
    test_questions.getAll(function (error, result) {
        if (error) {
            console.error('error running query', error);
            return next(error);
        }
        res.json(result.rows);
    });
}

module.exports = {
    index: getAllTestQuestions
};

