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

		this.router.post('/register', body(['firstname', 'lastname', 'email', 'password', 'usertype', 'employeeNo', 'agencyName']).not().isEmpty(), body('password').isLength({min: 5}), async (req, res) => {
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
		    return res.send(await this.loginUser(req.body))
		});
		
		this.router.post('/getName', body(['userid']).not().isEmpty(), async(req, res) => {
			let firstName = await getDB().getFirstname(req.body.UserID)
			let surname = await getDB().getLastname(req.body.UserID)
			return res.send({text: firstName + " " + surname})
		});
		this.router.post('/createListing', body(['AddressLine1', 'AddressLine2', 'City', 'County', 'Postcode', 'LandlordID', 'Country']).not().isEmpty(), async (req, res) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()){
				return res.status(422).json({ errors: errors.array() })
			}
			return res.send(await this.createListing(req.body))
		});

		this.router.post('/deleteListing', body(['ListingID']).not().isEmpty(), async (req,res) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()){
				return res.status(422).json({ errors: errors.array() })
			}
			return res.send(await this.deleteListing(req.body))
		});
	}

	async loginUser(loginDetails) {
		var res = await getDB().getUserPasswordHash(loginDetails.email);
		if (res == undefined)
			return {'success': false, 'user_id': null}
		if(!bcrypt.compareSync(loginDetails.password, res.Password))
			return {'success': false, 'user_id': null}

		var userType = await getDB().getUserType(res.UserID)
		return {'success': true, 'user_id': res.UserID, 'userType': userType }
	}

	async registerUser(registerDetails) {
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(registerDetails.password, salt);
		registerDetails.password = hash
		return await getDB().registerUser(registerDetails)
	}

	async createListing(ListingDetails){
		return await getDB().createListing(ListingDetails)

	}

	async deleteListing(ListingID){
		return await getDB().deleteListing(ListingID)
	}
}