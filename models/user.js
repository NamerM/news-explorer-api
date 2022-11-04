const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { LINK_REGEXP, EMAIL_REGEXP } = require('../utils/regex');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => EMAIL_REGEXP.test(v),
      message: 'Enter a Valid E-Mail Address',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }
          return user;
        });
    });
};

userSchema.methods.toJSON = function () {
  const { password, ...obj } = this.toObject();
  return obj;
};

module.exports = mongoose.model('user', userSchema);