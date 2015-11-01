var jwt = require('jsonwebtoken');
var config = require('../config/index');

function generateToken(payload) {
    var options = {
        expiresIn: config.jwt.expiresIn
    };
    return jwt.sign(payload, config.jwt.secret, options);
}

function validateToken(token) {
    return jwt.verify(token, config.jwt.secret);
}

module.exports = {
    generate: generateToken,
    validate: validateToken
};
