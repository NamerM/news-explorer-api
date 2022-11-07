require('dotenv').config({ path: '../../.env' });

const { JWT_SECRET } = require('../utils/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ExistingError = require('../errors/ExistingError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ data: user.toJSON(), token });
    })
    .catch(() => {
      next(new UnauthorizedError('Login information is incorrect, check either email or password'));
    });
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ExistingError('Current Email has already been registered');
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
     }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

const getUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(() => {
      throw new NotFoundError('Requested page not found');
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(next);
};

// const getAllUsers = (req, res, next) => {
//   User.find({})
//     .then((users) => res.status(200).send({ data: users })) // .send(users))
//     .catch(next);
// };

module.exports = {
  // getAllUsers,
  getUser,
  login,
  createUser,
};
