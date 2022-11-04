const router = require('express').Router();
const {
  getAllArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/cards');
const {
  validateCardBody,
  validateObjectId,
} = require('../middleware/validators');

router.get('/cards', getAllArticles);
router.delete('/cards/:cardId', validateObjectId, deleteArticle);
router.post('/cards', validateCardBody, createArticle);

module.exports = {
  cardRouter: router,
};
