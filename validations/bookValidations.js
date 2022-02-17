const Joi = require('joi');
const bookValidator = require('express-joi-validation').createValidator();

const bookSchema = Joi.object({
	title: Joi.string().alphanum().required(),
	author: Joi.string().min(3).max(30).required(),
	genre: Joi.string().required(),
	read: Joi.boolean().required()
});

const queryBookSchema = Joi.object({
	title: Joi.string().max(50),
	author: Joi.string().min(3).max(50)
});

module.exports = queryBookSchema;
module.exports = bookSchema;