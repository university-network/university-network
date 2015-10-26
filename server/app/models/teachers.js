db = require('../../config/pg');

function getAll(callback) {
    var query = [
        'SELECT',
        '   teachers.id,',
        '   teachers.user_id,',
        '   users.name,',
        '   users.email',
        'FROM teachers',
        'join users',
        'on teachers.user_id = users.id'
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

function getStudentsTeachers(params, callback) {
    var query = [
        'SELECT',
        '   u.name,',
        '   u.email',
        'FROM teachers t',
        'JOIN users u',
        'ON t.user_id = u.id',
        'JOIN taught_disciplines td',
        'ON td.teacher_id = t.id',
        'WHERE td.group_id = $1'
    ].join('\n');

    var data = [params.group_id];

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
    getStudentsTeachers: getStudentsTeachers
};
