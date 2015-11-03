function serializeArticle(article) {
    return {
        id: article.id,
        name: article.name,
        author: article.author,
        discipline: article.discipline,
        article: article.article
    };
}

function serializeArticles(articles) {
    return articles.map(function (article) {
        return serializeArticle(article);
    });
}

module.exports = {
    serializeOne: serializeArticle,
    serializeMany: serializeArticles
};
