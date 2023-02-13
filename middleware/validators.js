const { Joi, celebrate } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

// login validation
const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('The "email" field must be a valid email')
      .messages({
        'string.required': 'The field must have a valid Email',
        'string.email': 'Valid "email" is required',
      }),
    password: Joi.string().required().min(6)
      .messages({
        'string.required': 'The "password" field must be filled',
        'string.min': 'The Password must be at least 6 characters long',
      }),
  }),
});

// url validation
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

// user info validation
const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of the "name" field is 2',
        'string.max': 'The maximum length of the "name" field is 30',
        'string.required': 'The "name" field can not be left empty',
      }),
    email: Joi.string().required().email()
      .message('The "email" field must be a valid email')
      .messages({
        'string.required': 'The field must have a valid Email',
        'string.email': 'Valid "email" is required',
      }),
    password: Joi.string().required().min(6)
      .messages({
        'string.required': 'The "password" field must be filled',
        'string.min': 'The Password must be at least 6 characters long',
      }),
  }),
});

// Validate Article Id
const validateObjectId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Invalid Id');
    }),
  }),
});

// validate articles
const validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of the "name" field is 2',
        'string.max': 'The maximum length of the "name" field is 30',
        'string.required': 'The "keyword" field can not be left empty',
      }),
    title: Joi.string().required().min(4)
      .messages({
        'string.min': 'The minimum length of the "name" field is 4',
        'string.required': 'The "title" field can not be left empty',
      }),
    text: Joi.string().required()
      .messages({
        'string.required': 'The "text" field can not be left empty',
      }),
    date: Joi.string().required()
      .messages({
        'string.required': 'The "text" field can not be left empty',
      }),
    source: Joi.string().required()
      .messages({
        'string.required': 'The "text" field can not be left empty',
      }),
    link: Joi.string().required().custom(validateURL)
      .messages({
        'string.uri': 'Invalid type of URL',
        'string.required': '"Link" field can not be left empty',
      }),
    image: Joi.string().required().custom(validateURL)
      .messages({
        'string.uri': 'Invalid type of URL',
        'string.required': '"Link" field can not be left empty',
      }),
  }),
});

module.exports = {
  validateAuthentication,
  validateUserBody,
  validateObjectId,
  validateArticleBody,
};
