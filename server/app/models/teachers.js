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

function createTeacher(params, callback) {
    var query = [
        'INSERT INTO teachers',
        '   (user_id)',
        'VALUES',
        '   ($1)'
    ].join('\n');

    var data = [
        params.user_id
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
    create: createTeacher
};
