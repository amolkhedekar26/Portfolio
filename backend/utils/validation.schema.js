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

const schemaProfile = Joi.object().keys({
  userId: Joi.string().required().messages({
    "any.required": "User ID is required",
    "string.empty": "User ID is required",
  }),
  firstName: Joi.string().required().messages({
    "any.required": "First name is required",
    "string.empty": "First name is required",
  }),
  lastName: Joi.string().required().messages({
    "any.required": "Last name is required",
    "string.empty": "Last name is required",
  }),
  location: Joi.string().required().messages({
    "any.required": "Location is required",
    "string.empty": "Location is required",
  }),
  contactNo: Joi.string().required().messages({
    "any.required": "Contact number is required",
    "string.empty": "Contact number is required",
  }),
  aboutMe: Joi.string().required().messages({
    "any.required": "About me is required",
    "string.empty": "About me is required",
  }),
});

module.exports = {
  schemaRegister: schemaRegister,
  schemaLogin: schemaLogin,
  schemaForgot: schemaForgot,
  schemaReset: schemaReset,
  schemaProfile: schemaProfile,
};
