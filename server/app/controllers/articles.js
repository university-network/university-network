var articles = require('../models/articles');
var articleSerializer = require('../serializers/article');

function getAllArticles(req, res, next) {
    users.getAll(function (error, result) {
        if (error) {
            return next(error);
        }
        res.json(result.rows);
    });
}

function getArticlesByTeacher(req, res, next) {
    articles.getByTeacher(req.user.id, function (error, result) {
        if (error) {
            return next(error);
        }
        var articles = articleSerializer.serializeMany(result.rows);
        res.json(articles);
    });
}

function getArticlesByDiscipline(req, res, next) {

    articles.getByDiscipline(req.discipline.id, function (error, result) {
        if (error) {
            return next(error);
        }
        var articles = articleSerializer.serializeMany(result.rows);
        res.json(articles);
    });
}

function validateArticle(req, res, next) {
    var schema = {
        body: {
            type: 'object',
            required: ['article'],
            properties: {
                article: {
                    type: 'object',
                    required: ['name', 'teacher_id', 'discipline_id', 'article'],
                    properties: {
                        name: {
                            type: 'string',
                            minLength: 3,
                            maxLength: 120
                        },
                        teacher_id: {
                            type: 'int'
                        },
                        discipline_id: {
                            type: 'int'
                        },
                        article: {
                            type: 'string',
                            minLength: 10,
                            maxLength: 10000
                        }
                    }
                }
            }
        }
    };

    return validator.middleware(req, next, schema);
}

function createArticle(req, res, next) {
    var params = {
        name: req.body.article.name,
        teacher_id: req.body.article.teacher_id,
        discipline_id: req.body.article.discipline_id,
        article: req.body.article.article
    };

    articles.create(params, function (error, result) {
        if (error) {
            return next(error);
        }
        var createdArticle = result.rows[0];
        res.status(201).json(createdArticle);
    });
}

module.exports = {
    index: getAllArticles,
    getByDiscipline: getArticlesByDiscipline,
    getByTeacher: getArticlesByTeacher,
    create: [createArticle, validateArticle]
};

