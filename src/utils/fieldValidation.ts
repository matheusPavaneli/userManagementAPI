import Joi from 'joi';

const userCreationSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(31)
    .required()
    .pattern(new RegExp('^[a-zA-Z]'), { name: 'start with a letter' })
    .pattern(new RegExp('[a-zA-Z0-9._]+$'), { name: 'valid characters' })
    .pattern(new RegExp('^(?!.*[_.]{2})'), {
      name: 'no consecutive periods or underscores',
    })
    .pattern(new RegExp('^[^_.].*[^_.]$'), {
      name: 'not end with a period or underscore',
    })
    .messages({
      'any.required': 'Username is required',
      'string.empty': 'Username is not allowed to be empty',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username must be no longer than 31 characters',
      'string.pattern.name': 'Username must {#name}',
    }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is not allowed to be empty',
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  password: Joi.string()
    .min(8)
    .max(16)
    .required()
    .pattern(new RegExp('\\d'), { name: 'one digit' })
    .pattern(new RegExp('[A-Z]'), { name: 'one uppercase letter' })
    .pattern(new RegExp('[a-z]'), { name: 'one lowercase letter' })
    .pattern(new RegExp('[^a-zA-Z0-9]'), {
      name: 'one non-alphanumeric character',
    })
    .messages({
      'any.required': 'Password is required',
      'string.empty': 'Password is not allowed to be empty',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must be no longer than 16 characters',
      'string.pattern.name': 'Password must contain at least {#name}',
    }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).messages({
    'any.only': 'Passwords do not match',
  }),
});

const userUpdateSchema = Joi.object({
  email: Joi.string().email().optional().allow('').messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email is not allowed to be empty',
  }),
  username: Joi.string()
    .min(3)
    .max(31)
    .optional()
    .allow('')
    .pattern(new RegExp('^[a-zA-Z]'), { name: 'start with a letter' })
    .pattern(new RegExp('[a-zA-Z0-9._]+$'), { name: 'valid characters' })
    .pattern(new RegExp('^(?!.*[_.]{2})'), {
      name: 'no consecutive periods or underscores',
    })
    .pattern(new RegExp('^[^_.].*[^_.]$'), {
      name: 'not end with a period or underscore',
    })
    .messages({
      'string.empty': 'Username is not allowed to be empty',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username must be no longer than 31 characters',
      'string.pattern.name': 'Username must {#name}',
    }),
  password: Joi.string()
    .min(8)
    .max(16)
    .optional()
    .allow('')
    .pattern(new RegExp('\\d'), { name: 'one digit' })
    .pattern(new RegExp('[A-Z]'), { name: 'one uppercase letter' })
    .pattern(new RegExp('[a-z]'), { name: 'one lowercase letter' })
    .pattern(new RegExp('[^a-zA-Z0-9]'), {
      name: 'one non-alphanumeric character',
    })
    .messages({
      'string.empty': 'Password is not allowed to be empty',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must be no longer than 16 characters',
      'string.pattern.name': 'Password must contain at least {#name}',
    }),
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().email().messages({
    'string.email': 'Invalid email format',
    'string.empty': 'Email is not allowed to be empty',
  }),
});

const newPasswordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .max(16)
    .required()
    .pattern(new RegExp('\\d'), { name: 'one digit' })
    .pattern(new RegExp('[A-Z]'), { name: 'one uppercase letter' })
    .pattern(new RegExp('[a-z]'), { name: 'one lowercase letter' })
    .pattern(new RegExp('[^a-zA-Z0-9]'), {
      name: 'one non-alphanumeric character',
    })
    .messages({
      'any.required': 'Password is required',
      'string.empty': 'Password is not allowed to be empty',
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must be no longer than 16 characters',
      'string.pattern.name': 'Password must contain at least {#name}',
    }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).messages({
    'any.only': 'Passwords do not match',
  }),
});

const TwoStepCodeSchema = Joi.object({
  verifyCode: Joi.string()
    .pattern(/^[0-9]{6}$/, 'digits')
    .required()
    .messages({
      'any.required': '2FA code is required',
      'string.empty': '2FA code is not allowed to be empty',
      'string.pattern.base': 'The 2FA code must be 6 digits long',
      'string.pattern.name': 'The 2FA code must be 6 digits long',
    }),
});

export {
  userCreationSchema,
  userUpdateSchema,
  resetPasswordSchema,
  newPasswordSchema,
  TwoStepCodeSchema,
};
