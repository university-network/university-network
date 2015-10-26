db = require('../../config/pg');

function getAll(callback) {
    var query = [
        'SELECT',
        '   action_id,',
        '   user_id,',
        '   action_time',
        'FROM log_events'
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

module.exports = {
    getAll: getAll
};
