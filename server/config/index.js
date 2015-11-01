var env = process.env.NODE_ENV || 'development';

var db = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    dbname: process.env.DB_NAME || 'university-network', //+ env,
    user: process.env.DB_USER || 'university-network',//+ env,
    password: process.env.DB_PASSWORD || '123456'
};

var jwt = {
    secret: process.env.JWTSECRET || 'secret',
    expiresIn: '7d'
};

var defaults = {
    server: {
        port: parseInt(process.env.PORT) || 3000,
        host: process.env.HOST || 'localhost'
    },
    db: 'postgres://' + db.user + ':' + db.password + '@' + db.host + '/' + db.dbname,
    jwt: jwt
};

module.exports = defaults;
