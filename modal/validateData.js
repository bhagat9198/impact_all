const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const signupSchema = Joi.object({
  username: Joi.string().min(4).required(),
  password: Joi.string().min(5).required(),
  coursename: Joi.string().min(4).required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().greater(Joi.ref('startDate')),
});

const signinSchema = Joi.object({
  username: Joi.string().min(4).required(),
  password: Joi.string().min(5).required(),
});

exports.validateSignup = validator(signupSchema);
exports.validateSignin = validator(signinSchema);