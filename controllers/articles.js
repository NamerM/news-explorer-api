const Article = require('../models/article');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getAllArticles = (req, res, next) => {
  Article.find({})

    .then((articles) => res.status(200).send({ data: articles }))
    .catch((err) => {
      next(err);
    });
};

const createArticle = (req, res, next) => {
  const { keyword, title,text, date, source, link, image } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
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
      throw new NotFoundError('Card Not Found!');
    })
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        next(new ForbiddenError('This is not your card to delete!'));
      } else {
        Article.findByIdAndRemove(articleId)
          .then((deleteArticle) => res.send(deleteArticle));
      }
    })
    .catch(next);
};


module.exports = {
getAllArticles,
createArticle,
deleteArticle,
};
