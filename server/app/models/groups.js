db = require('../../config/pg');

function getAll(callback) {
    var query = [
        'SELECT',
        '   id,',
        '   cipher,',
        '   mentor_id',
        'FROM groups'
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

function createGroup(params, callback) {
    var query = [
        'INSERT INTO groups',
        '   (cipher, mentor_id)',
        'VALUES',
        '   ($1, $2)'
    ].join('\n');

    var data = [
        params.cipher,
        params.mentor_id
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
    create: createGroup
};
