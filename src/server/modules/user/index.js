var bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var { getDB } = require('../db/index.js')
var express = require('express');

module.exports = class UserService{
	constructor(path){
		this.path = path
		this.router = express.Router();
		this.initialiseRoutes();
	}
	

	initialiseRoutes() {

		this.router.post('/register', body(['firstname', 'lastname', 'email', 'password', 'usertype']).not().isEmpty(), body('password').isLength({min: 5}), async (req, res) => {
		    const errors = validationResult(req);
		    if (!errors.isEmpty()) {
		      return res.status(422).json({ errors: errors.array() })
		    }

		    return res.send(await this.registerUser(req.body))
		}); 

		this.router.post('/login', body(['email', 'password']).not().isEmpty(),async (req, res) => {
			const errors = validationResult(req);
		    if (!errors.isEmpty()) {
		      return res.status(422).json({ errors: errors.array() })
		    }
		    console.log(req.body)
		    return res.send(await this.loginUser(req.body))
		}); 			
	}

	async loginUser(loginDetails) {
		var res = await getDB().getUserPasswordHash(loginDetails.email);
		if (res == undefined)
			return {'message': "Email not found"}
		if(!bcrypt.compareSync(loginDetails.password, res.Password))
<<<<<<< HEAD
			return {'message': 'Wrong Password'}

			
		return {'message': "Login successful"}
=======
			return {'error': 'Wrong Password'}
		else{
			const userID = await getDB().getUserID(loginDetails.email)
			return {'message': "Login successful for User:" + userID.UserID
					+ " Email:" + (loginDetails.email)}
		}
		
>>>>>>> origin/sammi
	}

	async registerUser(registerDetails) {
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(registerDetails.password, salt);
		registerDetails.password = hash
		return await getDB().registerUser(registerDetails)
	}
}
