db = require('../../config/pg');

function getAll(callback) {
    var query = [
        'SELECT',
        '   a.id,',
        '   a.name AS article_name,',
        '   u.id AS author_id,',
        '   u.name AS author_name,',
        '   d.discipline_name,',
        '   a.article',
        'FROM articles a',
        'JOIN teachers t',
        '   ON a.teacher_id = t.id',
        'JOIN users u',
        '   ON t.user_id = u.id',
        'JOIN disciplines d',
        '   ON d.id = a.discipline_id'
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
