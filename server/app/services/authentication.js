var bcrypt = require('bcrypt');
var users = require('../models/users');

function validateCredentials(params, callback) {
    users.findByEmail(params.email, function (err, result) {
        if (err) {
            return callback(err);
        }
        var actualUser = result.rows[0];
        if (!actualUser) {
            return callback(null, null);
        }
        bcrypt.compare(params.password, actualUser.password_hash, function(err, equal){
            if(err){
                return callback(err);
            }
            if(!equal){
                return callback(null,null);
            }
            callback(null,actualUser);
        });
    });
}

module.exports = {
    validate: validateCredentials
};
