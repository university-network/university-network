db = require('../../config/pg');

function getAll(callback) {
    var query = [
        'SELECT',
        '   id,',
        '   sender_id,',
        '   receiver_id,',
        '   message,',
        '   sending_time',
        'FROM messages'
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

function createMessage(params, callback) {
    var query = [
        'INSERT INTO messages',
        '   (sender_id,' +
        '   receiver_id,' +
        '   message,' +
        '   sending_time)',
        'VALUES',
        '   ($1, $2, $3, $4)'
    ].join('\n');

    var data = [
        params.sender_id,
        params.receiver_id,
        params.message,
        params.sending_time
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
    create: createMessage
};
