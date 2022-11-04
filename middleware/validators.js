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
        'string.empty': 'The "password" field must be filled',
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

// Validate Profile
const validateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of the "name" field is 2',
        'string.max': 'The maximum length of the "name" field is 30',
        'string.empty': 'The "name" field can not be left empty',
      }),
    about: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of the "name" field is 2',
        'string.max': 'The maximum length of the "name" field is 30',
        'string.empty': 'The "about" field can not be left empty',
      }),
  }),
});

// Validate Avatar
const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL)
      .message('The "avatar" address field must be filled'),
  }),
});

// Validate card Id?
const validateObjectId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Invalid Id');
    }),
  }),
});

// Validateuser Id?
const validateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Invalid Id');
    }),
  }),
});

// validate cards
const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of the "name" field is 2',
        'string.max': 'The maximum length of the "name" field is 30',
        'string.empty': 'The "name" field can not be left empty',
      }),
    link: Joi.string().required().custom(validateURL)
      .messages({
        'string.uri': 'Invalid type of URL',
        'string.empty': '"Link" field can not be left empty',
      }),
  }),
});

module.exports = {
  validateAuthentication,
  validateProfile,
  validateAvatar,
  validateUserBody,
  validateObjectId,
  validateCardBody,
  validateUserId,
};
