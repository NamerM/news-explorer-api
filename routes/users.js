const router = require('express').Router();
const {
  getUser,
  // getAllUsers,
} = require('../controllers/users');

router.get('/users/me', getUser);
// router.get('/users/', getAllUsers);

module.exports = {
  userRouter: router,
};
