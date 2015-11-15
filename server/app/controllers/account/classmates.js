var Student = require('../../models/students');
var studentSerializer = require('../../serializers/student');

function getAllClassmates(req, res, next) {
    Student.getAllClassmates(req.user.id, function (error, students) {
        if (error) {
            return next(error);
        }
        var serializedStudents = studentSerializer.serializeMany(students);
        res.json(serializedStudents);
    });
}

module.exports = {
    index: getAllClassmates
};
