db = require('../../config/pg');

function getAll(callback) {
    var query = [
        'SELECT',
        '   students.id,',
        '   students.group_id,',
        '   users.id,',
        '   users.name,',
        '   groups.cipher',
        'FROM students',
        'left join users',
        'on students.user_id = users.id',
        'left join groups',
        'on students.group_id = groups.id'
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

function createStudent(params, callback) {
    var query = [
        'INSERT INTO students',
        '   (group_id,',
        '   user_id)',
        'VALUES',
        '   ($1,$2)'
    ].join('\n');

    var data = [
        params.group_id,
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

function getAllByGroupId(params, callback) {
    var query = [
        'SELECT',
        '   s.id,',
        '   u.name',
        'FROM students s',
        'LEFT JOIN users u',
        '   ON s.user_id = u.id',
        'WHERE s.group_id = $1'
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
    create: createStudent,
    getAllByGroupId: getAllByGroupId
};
