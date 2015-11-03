db = require('../../config/pg');

function getAll(callback) {
    var query = [
        'SELECT',
        '   id,',
        '   name',
        '   teacher_id,',
        '   discipline_id,',
        '   article',
        'FROM articles'
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

function createArticle(params, callback) {
    var query = [
        'INSERT INTO articles',
        '   (teacher_id,' +
        '   discipline_id,' +
        '   article,' +
        '   name)',
        'VALUES',
        '   ($1,$2,$3,$4)'
    ].join('\n');

    var data = [
        params.teacher_id,
        params.discipline_id,
        params.article,
        params.name
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
    create: createArticle
};
