db = require('../../config/pg');

function getAll(callback) {
    var query = [
        'SELECT',
        '   a.id,',
        '   a.name AS article_name,',
        '   u.id AS teacher_id,',
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

function getAllByTeacher(user_id, callback) {
    var query = [
        'SELECT',
        '   a.id,',
        '   a.name,',
        '   a.teacher_id,',
        '   a.discipline_id,',
        '   d.discipline_name,',
        '   a.article AS content,',
        '   u.name    AS author_name',
        'FROM teachers t',
        'JOIN articles a',
        '   ON a.teacher_id = t.id',
        'JOIN disciplines d',
        '   ON a.discipline_id = d.id',
        'JOIN teachers t2',
        '   ON a.teacher_id = t2.id',
        'JOIN users u',
        '   ON t2.user_id = u.id',
        'WHERE t.user_id = $1'
    ].join('\n');

    var data = [user_id];

    db.query(query, data, function (err, result, done) {
        done();

        if (err) {
            return callback(err);
        }
        callback(err, result.rows);
    });
}

function getAllByStudent(user_id, callback) {
    var query = [
        'SELECT',
        '   a.id,',
        '   a.name,',
        '   a.teacher_id,',
        '   a.discipline_id,',
        '   d.discipline_name,',
        '   a.article AS content,',
        '   u.name    AS author_name',
        'FROM students s',
        'JOIN taught_disciplines td',
        '   ON td.group_id = s.group_id',
        'JOIN disciplines d',
        '   ON td.discipline_id = d.id',
        'JOIN articles a',
        '   ON a.discipline_id = d.id',
        'JOIN teachers t',
        '   ON a.teacher_id = t.id',
        'JOIN users u',
        '   ON t.user_id = u.id',
        'WHERE s.user_id = $1'
    ].join('\n');

    var data = [user_id];

    db.query(query, data, function (err, result, done) {
        done();

        if (err) {
            return callback(err);
        }
        callback(err, result.rows);
    });
}

function getAllByDiscipline(discipline_id, callback) {
    var query = [
        'SELECT',
        '   a.id,',
        '   a.name,',
        '   a.teacher_id,',
        '   a.discipline_id,',
        '   d.discipline_name,',
        '   a.article AS content,',
        '   u.name    AS author_name',
        'FROM articles a',
        'JOIN disciplines d',
        '   ON d.id = a.discipline_id',
        'JOIN teachers t',
        '   ON a.teacher_id = t.id',
        'JOIN users u',
        '   ON t.user_id = u.id',
        'WHERE a.discipline_id = $1'
    ].join('\n');

    var data = [discipline_id];

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
    create: createArticle,
    getByDiscipline: getAllByDiscipline,
    getAllByTeacher: getAllByTeacher,
    getAllByStudent: getAllByStudent
};
