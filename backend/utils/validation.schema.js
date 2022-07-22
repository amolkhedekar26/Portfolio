const Joi = require("joi");

const schemaRegister = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    )
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    }),
});

const schemaLogin = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
});

const schemaForgot = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
});

const schemaReset = Joi.object().keys({
  password: Joi.string().min(8).required(),
});

module.exports = {
  schemaRegister: schemaRegister,
  schemaLogin: schemaLogin,
  schemaForgot: schemaForgot,
  schemaReset: schemaReset,
};
