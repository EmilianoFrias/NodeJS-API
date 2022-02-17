const express = require ('express');
const userController = require('../controllers/userControllers');
//const validator = require(''express-jpi-validation').createrValidator;
const routes = (User) => {

	const userRouter = express.Router();
	const { getUsers, postUsers, getUserById, putUsers, deleteUserById, postLogin, getUserByUserName} = userController(User);

	userRouter.route('/user')
		.get(getUsers)
		.post(postUsers);

	userRouter.route('/users/:userId')
		.get(getUserById)
		.put(putUsers)
		.delete(deleteUserById);
	
	userRouter.route('users/:username')
		.get(getUserByUserName)

	userRouter.route('/users/login')
		.post(postLogin); 

//	userRouter.route('/users/validateToken')
//		.get(validateToken);

	return userRouter;
	}

module.exports = routes;
