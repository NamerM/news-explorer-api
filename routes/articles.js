const router = require('express').Router();
const {
  getAllArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');
const {
  validateCardBody,
  validateObjectId,
} = require('../middleware/validators');

router.get('/articles', getAllArticles);
router.delete('/articles/:articleId', validateObjectId, deleteArticle);
router.post('/articles', validateCardBody, createArticle);

module.exports = {
  articleRouter: router,
};
