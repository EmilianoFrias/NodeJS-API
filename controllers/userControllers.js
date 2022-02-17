const bcrypt = require('bcrypt');
const req = require('express/lib/request');
const jwt = require('jsonwebtoken');

const userController = (User) => {

	const getUsers = async (req, res) => {
		const { query } = req;
		const response = await User.find(query)

		res.json(response);
	}

	const postUsers = async (req, res) => {
		const user = new User(req.body); //metodo post
		//user.password = await bcrypt.hash(user.password, 10);																	
		await user.save();
		res.json(User);
	}

	const getUserById = async (req, res) => {
		const { params } = req;
		const response = await User.findById(params.userId);

		res.json(response);
	}

	const getUserByUserName = async (req,res) =>{
		const { query } = req;
		const user = await User.findOne({'userName': query.userName});

		if(user===null){
			res.json('Invalid credentials');
		} else{
			res.json(user)
		}
	}

	const putUsers = async(req, res) =>{
		const { body } = req;
		const response = await User.updateOne({
			_id: req.params.userId
		}, {
			$set: {
				firstName: body.firstName,
				lastName: body.lastName,
				userName: body.userName,
				//password: await bcrypt.hash(body.password, 10),
				password:body.password,
				email: body.email,
				address: body.address,
				phone: body.phone
			}
		})
		res.json(response);
	}

	const deleteUserById = async(req, res) =>{
		const id = req.params.userId;

		await User.findByIdAndDelete(id);

		res.status(202).json('User has been deleted...');
	}

	const postLogin = async(req, res) =>{
		const {body} = req;
		var response;

		const savedUser = await User.findOne({'userName': body.userName});

		if(savedUser && savedUser.password === body.password) {
			//res.status(401).json('User not found');
			const token = generateToken(savedUser);

			response = {message: 'ok', token};

		}else{
			response={message:'Invalid credentials'};
		}
		res.json(response);
	}

	const generateToken = savedUser => {
		const tokenPayLoad = {
			name: savedUser.name,
			userName: savedUser.userName,
			lastName: savedUser.lastName
		}
	
		return jwt.sign(tokenPayLoad, 'secretPassword', {expiresIn: '1h'});
	}

	return{ getUsers, postUsers, getUserById, putUsers, deleteUserById, postLogin, getUserByUserName };
}

module.exports = userController; //exporto o hago visible la funcion