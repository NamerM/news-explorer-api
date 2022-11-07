const router = require('express').Router();
const { validateAuthentication, validateUserBody } = require('../middleware/validators');
const auth = require('../middleware/auth');
const { createUser, login } = require('../controllers/users');
const { userRouter } = require('./users');
const { articleRouter } = require('./articles');
const { nonExisted } = require('./nonExisted');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateAuthentication, login);

router.use(auth);
router.use('/', userRouter);
router.use('/', articleRouter);
router.use(nonExisted);

module.exports = { router };
