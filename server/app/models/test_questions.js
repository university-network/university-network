db = require('../../config/pg');

function getTest(test_id, callback) {
    var query = [
        'SELECT',
        '   tq.id,',
        '   tq.question,',
        '   tq.answer AS correct_answer,',
        '   sa.student_answer,',
        '   sa.correct',
        'FROM test_questions AS tq',
        'LEFT JOIN student_answers AS sa',
            'ON sa.question_id = tq.id',
        'WHERE sa.test_id = $1'
    ].join('\n');

    var data = [test_id];

    db.query(query, data, function (err, result, done) {
        done();

        if (err) {
            return callback(err);
        }
        callback(err, result.rows);
    });
}

module.exports = {
    getTest: getTest
};
