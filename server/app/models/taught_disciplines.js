db = require('../../config/pg');

function getAll(callback) {
    var query = [
        'SELECT',
        '   u.name,',
        '   d.discipline_name,',
        '   g.cipher',
        'FROM taught_disciplines td',
        'JOIN disciplines d',
        'ON td.discipline_id = d.id',
        'JOIN teachers t',
        'ON td.teacher_id = t.id',
        'JOIN groups g',
        'ON td.group_id = g.id',
        'JOIN users u',
        'ON t.user_id = u.id',
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
