const router = require('express').Router();
const {
  getUser,
} = require('../controllers/users');
// const {
//   validateProfile,
// } = require('../middleware/validators');
router.get('/users/me', getUser);

module.exports = {
  userRouter: router,
};
