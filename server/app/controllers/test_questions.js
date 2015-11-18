var test_questions = require('../models/test_questions');
var testQuestionSerializer = require('../serializers/test_question');

function getTestQuestions(req, res, next) {
    test_questions.getTest(req.params.id, function (error, result) {
        if (error) {
            return next(error);
        }
        var test_questions = testQuestionSerializer.serializeMany(result);
        res.json(test_questions);
    });
}

module.exports = {
    test: getTestQuestions
};

