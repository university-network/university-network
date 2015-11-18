db = require('../../config/pg');

function getAll(callback) {
    var query = [
        'SELECT',
        '   id,',
        '   test_id,',
        '   question_id,',
        '   student_answer,',
        '   correct',
        'FROM student_answers'
    ].join('\n');

    var data = [];

    db.query(query, data, function (err, result, done) {
        done();

        if (err) {
            return callback(err);
        }
        callback(err, result);
    });
}

function createAnswer(params, callback) {
    var query = [
        'INSERT INTO student_answers',
        '   (test_id,',
        '   question_id,',
        '   student_answer)',
        'VALUES',
        '   ($1, $2, $3)'
    ].join('\n');

    var data = [
        params.test_id,
        params.question_id,
        params.answer
    ];

    db.query(query, data, function (err, result, done) {
        done();

        if (err) {
            return callback(err);
        }
        callback(err, result);
    });
}

module.exports = {
    getAll: getAll,
    create: createAnswer
};
