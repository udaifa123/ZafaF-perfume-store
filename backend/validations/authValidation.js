const Joi = require("joi");

exports.registerValidation = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "admin").optional(),
});

exports.loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

