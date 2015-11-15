var Discipline = require('../../models/disciplines');
var disciplineSerializer = require('../../serializers/discipline');

function getStudentsDisciplines(req, res, next) {
    Discipline.getAllForStudent(req.user.id, function (error, disciplines) {
        if (error) {
            return next(error);
        }
        var serializesDisciplines = disciplineSerializer.serializeMany(disciplines);
        res.json(serializesDisciplines);
    });
}

function getTeachersDisciplines(req, res, next) {
    Discipline.getAllForTeacher(req.user.id, function (error, disciplines) {
        if (error) {
            return next(error);
        }
        var serializesDisciplines = disciplineSerializer.serializeMany(disciplines);
        res.json(serializesDisciplines);
    });
}

function getAllDisciplines(req, res, next) {
    switch (req.user.role) {
        case "student":
            getStudentsDisciplines(req, res, next);
            break;
        case "teacher":
            getTeachersDisciplines(req, res, next);
            break;
        default:
            var err = new Error("You can't perform this action");
            err.status = 403;
            next(err);
    }
}

module.exports = {
    index: getAllDisciplines
};
