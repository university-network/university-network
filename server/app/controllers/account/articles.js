var Article = require('../../models/articles');
var articleSerializer = require('../../serializers/article');

function getTeachersArticles(req, res, next) {
    Article.getAllByTeacher(req.user.id, function (error, articles) {
        if (error) {
            return next(error);
        }
        var serializedArticles = articleSerializer.serializeMany(articles);
        res.json(serializedArticles);
    });
}

function getStudentsArticles(req, res, next) {
    Article.getAllByStudent(req.user.id, function (error, articles) {
        if (error) {
            return next(error);
        }
        var serializedArticles = articleSerializer.serializeMany(articles);
        res.json(serializedArticles);
    });
}

function getAllArticles(req, res, next) {
    switch (req.user.role) {
        case "student":
            getStudentsArticles(req, res, next);
            break;
        case "teacher":
            getTeachersArticles(req, res, next);
            break;
        default:
            var err = new Error("You can't perform this action");
            err.status = 403;
            next(err);
    }


}

module.exports = {
    index: getAllArticles
};
