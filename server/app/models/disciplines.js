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
        '   d.discipline_name',
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
    getSchedule: getGroupSchedule
};
