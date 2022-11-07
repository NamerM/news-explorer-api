const Article = require('../models/article');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getAllArticles = (req, res, next) => {
  const owner = req.user._id

  Article.find({ owner })
    .then((articles) => res.status(200).send(articles))
    .catch((err) => {
      next(err);
    });
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const id = req.user._id;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: id,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(articleId)
    .orFail(() => {
      throw new NotFoundError('Article Not Found!');
    })
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        next(new ForbiddenError('This is not your article to delete!'));
      } else {
        Article.findByIdAndRemove(articleId)
          .then((deletedArticle) => res.status(200).send(deletedArticle));
      }
    })
    .catch(next);
};

module.exports = {
  getAllArticles,
  createArticle,
  deleteArticle,
};
