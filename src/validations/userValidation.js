const joi = require("joi");
const userModel = require('../models/userModel')

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

  const duplicateKey =  (data)=>{
    const user =  userModel.findOne({$or : [data],isDeleted:false});
    console.log(user._doc);
    if(user._doc){
      if(user.email==data.email) return 'email is already in use.'
      else if(user.username==data.username) return 'username is already in use.'
    }
  }


  module.exports = {createValidationSchema, loginValidationSchema, updateValidationSchema, duplicateKey}