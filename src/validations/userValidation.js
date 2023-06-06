const joi = require("joi");

const createValidationSchema = joi.object({
    username: joi.string().required(),
    email: joi
      .string()
      .required()
      .regex(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
    password: joi
      .string()
      .required()
      .min(8)
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      ),
    role: joi
    .string()
    .default('user')
    .valid('admin','user')  
  });


  const loginValidationSchema = joi.object({
    email: joi
      .string()
      .required()
      .regex(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
    password: joi
      .string()
      .required()
      .min(8)
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
  });


  const updateValidationSchema = joi.object({
    username: joi.string(),
    email: joi
      .string()
      .regex(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
    password: joi
      .string()
      .min(8)
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      ),
    role: joi
    .string()
    .default('user')
    .valid('admin','user')  
  });


  module.exports = {createValidationSchema, loginValidationSchema, updateValidationSchema}