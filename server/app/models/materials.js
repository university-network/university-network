db = require('../../config/pg');

function getAll(callback) {
    var query = [
        'SELECT',
        '   id,',
        '   discipline_id,',
        '   link',
        'FROM materials'
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

function createMaterial(params, callback) {
    var query = [
        'INSERT INTO materials',
        '   (name, link, discipline_id)',
        'VALUES',
        '   ($1, $2, $3)'
    ].join('\n');

    var data = [
        params.name,
        params.link,
        params.discipline_id
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
    create: createMaterial
};
