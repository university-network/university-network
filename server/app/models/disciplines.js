db = require('../../config/pg');

function getAll(callback) {
    var query = [
        'SELECT',
        '   *',
        'FROM disciplines'
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

function getGroupSchedule(params, callback) {
    var query = [
        'SELECT',
        '   d.id',
        '   d.discipline_name AS name',
        'FROM disciplines d',
        'JOIN taught_disciplines td ON',
        '   d.id = td.discipline_id',
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

function getAllForStudent(user_id, callback) {
    var query = [
        'SELECT',
        '   d.id,',
        '   d.discipline_name AS name',
        'FROM disciplines d',
        'JOIN taught_disciplines td ',
            'ON d.id = td.discipline_id',
        'JOIN students s ',
            'ON td.group_id = s.group_id',
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

function getAllForTeacher(user_id, callback) {
    var query = [
        'SELECT',
        '   d.id,',
        '   d.discipline_name AS name',
        'FROM disciplines d',
        'JOIN taught_disciplines td ',
        'ON d.id = td.discipline_id',
        'JOIN groups g ',
        'ON td.group_id = s.group_id',
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

function createDiscipline(params, callback) {
    var query = [
        'INSERT INTO disciplines',
        '   (discipline_name)',
        'VALUES',
        '   ($1)'
    ].join('\n');

    var data = [
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
    create: createDiscipline,
    getSchedule: getGroupSchedule,
    getAllForStudent: getAllForStudent,
    getAllForTeacher: getAllForTeacher
};
