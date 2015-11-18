var _ = require('lodash');

function serializeQuestion(test_question) {
    if (!test_question || !_.isObject(test_question)) {
        return null;
    }

    return {
        id: test_question.id,
        question: test_question.question,
        students_answer: test_question.students_answer,
        correct_answer: test_question.correct_answer,
        correct: test_question.correct
    };
}

function serializeQuestions(test_questions) {
    if (!test_questions || !_.isFunction(test_questions.map)) {
        return null;
    }

    return test_questions.map(function (test_question) {
        return serializeQuestion(test_question);
    });
}

module.exports = {
    serializeOne: serializeQuestion,
    serializeMany: serializeQuestions
};
