var pg = require('pg');
var config = require('./index');

function query(querystring, data, callaback) {
    pg.connect(config.db, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query(querystring, data, function(error, result) {
            callaback(error, result, done);
        });
    });
}

module.exports = {
    query: query
};
