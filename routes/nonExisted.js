const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

router.use('*', (res, req, next) => {
  next(new NotFoundError('The page requested not found'));
});

module.exports = {
  nonExisted: router,
};
