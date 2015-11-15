var _ = require('lodash');

function serializeArticle(article) {
    if (!_.isObject(article)) {
        return null;
    }

    return {
        id: article.id,
        name: article.name,
        content: article.content,
        author: {
            id: article.teacher_id,
            name: article.author_name
        },
        discipline: {
            id: article.discipline_id,
            name: article.discipline_name
        }
    };
}

function serializeArticles(articles) {
    return _.map(articles, serializeArticle);
}

module.exports = {
    serializeOne: serializeArticle,
    serializeMany: serializeArticles
};
