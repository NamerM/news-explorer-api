const mongoose = require('mongoose');

const { LINK_REGEXP } = require('../utils/regex');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  date: {
    type: String, //Date
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return LINK_REGEXP.test(v);
      },
      message: 'Enter a Valid URL address',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return LINK_REGEXP.test(v);
      },
      message: 'Enter a Valid URL address for the Image',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  // likes: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: 'user',
  //   default: [],
  // },
});

module.exports = mongoose.model('article', articleSchema);