var bcrypt = require('bcrypt');
var users = require('../models/users');

function registerUser(params, callback) {
    bcrypt.genSalt(12, function (err, salt) {
        bcrypt.hash(params.password, salt, function (err, hash) {
            if (err) {
                return callback(err);
            }
            var user_params = {
                name: params.name,
                email: params.email,
                photo: params.photo,
                role: params.role,
                login: params.login,
                password_hash: hash
            };
            users.create(user_params, function (err, result) {
                if (err && err.code == '23505') {
                    var error = new Error('Record duplication');
                    return callback(error);
                }
                if (err) {
                    return callback(err);
                }
                callback(null, result.rows[0]);
            });
        });
    });
}

module.exports = {
    register: registerUser
};
