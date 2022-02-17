const Joi = require('joi');
const userValidator = require('express-joi-validation').createValidator();

const userSchema = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string().min(2).required(),
	userName: Joi.string().min(3).max(30).required(),
	password: Joi.alphanum().min(8).required(),
	email: Joi.string().email().required(),
	address: Joi.alphanum().required(),
	phone: Joi.number().integer().required() 
});

module.exports = userSchema;

