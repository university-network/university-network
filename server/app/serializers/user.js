var jwt = require('../../lib/token');

function serializeUser(user) {
    return {
        id: user.id,
        name: user.name,
        photo: user.photo,
        email: user.email,
        access_level: user.access_level,
        token: generateToken(user)
    };
}

function serializeUsers(users) {
    return users.map(function (user) {
        return serializeUser(user);
    });
}

function generateToken(user) {
    var payload = {
        id: user.id,
        access_level: user.access_level
    };
    return jwt.generate(payload);
}

module.exports = {
    serializeOne: serializeUser,
    serializeMany: serializeUsers
};
