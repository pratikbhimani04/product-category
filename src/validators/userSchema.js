const joi = require("joi");

const SignupReqSchema = {
  body: joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
};

const LoginReqSchema = {
  body: joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
};

module.exports = {
  SignupReqSchema,
  LoginReqSchema,
};
