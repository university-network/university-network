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
        '   ($1,$2,$3,$4,$5,$6)',
        'RETURNING',
        '   id,',
        '   name,',
        '   email,',
        '   photo,',
        '   access_level'
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

function findUserByEmail(email, callback) {
    var query = [
        'SELECT',
        '   id,',
        '   name,',
        '   email,',
        '   photo,',
        '   login,',
        '   access_level,',
        '   password_hash',
        'FROM users',
        'WHERE email = $1'
    ].join('\n');

    var data = [email];

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
    create: createUser,
    findByEmail: findUserByEmail
};
