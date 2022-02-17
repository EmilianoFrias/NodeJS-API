const express = require ('express');
const bookController = require('../controllers/bookControllers');
const Joi = require('Joi');
const bookValidatorSchema = require('../validations/bookValidations');
const validator = require('express-joi-validation').createValidator();

const routes = (Book) => {
	const bookRouter = express.Router();
	
	const { getBooks, postBooks, getBookById, getBookByAuthor, getBookByTitle, putBooks, deleteBooksById } = bookController(Book);

	bookRouter.route('/books')
		.get( getBooks)
		.post(postBooks);

	bookRouter.route('/books/:bookId')
		.get(getBookById)
		.put(putBooks)
		.delete(deleteBooksById)

 	bookRouter.route('/books/:author')
		.get (getBookByAuthor)

	bookRouter.route('/books/:title')
		.get(getBookByTitle)

	return bookRouter;

	}

module.exports = routes;


