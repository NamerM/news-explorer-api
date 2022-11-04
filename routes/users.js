const router = require('express').Router();
const {
  getUser,
  getAllUsers,
} = require('../controllers/users');
// const {
//   validateProfile,
// } = require('../middleware/validators');
router.get('/users/me', getUser);
router.get('/users/', getAllUsers);

module.exports = {
  userRouter: router,
};
