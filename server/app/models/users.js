db = require('../../config/pg');

function getAll(callback) {
    var query = [
        'SELECT',
        '   id,',
        '   name,',
        '   email',
        'FROM users'
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

function createUser(params, callback) {
    var query = [
        'INSERT INTO users',
        '   (name,',
        '   email,',
        '   photo,',
        '   access_level,',
        '   login,',
        '   password_hash)',
        'VALUES',
        '   ($1,$2,$3,$4,$5,md5($6))'
    ].join('\n');

    var data = [
        params.name,
        params.email,
        params.photo,
        params.access_level,
        params.login,
        params.password_hash
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
    create:createUser
};
