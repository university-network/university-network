var jwt = require('../../lib/token');

function serializeUser(user) {
    if (user !== null && typeof user === 'object') {
        return {
            id: user.id,
            name: user.name,
            photo: user.photo,
            email: user.email,
            role: user.role,
            token: generateToken(user)
        };
    }
    else {
        return null;
    }
}

function serializeUsers(users) {
    return users.map(function (user) {
        return serializeUser(user);
    });
}

function generateToken(user) {
    var payload = {
        id: user.id,
        role: user.role
    };
    return jwt.generate(payload);
}

module.exports = {
    serializeOne: serializeUser,
    serializeMany: serializeUsers
};
