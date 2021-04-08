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

		this.router.post('/register', body(['firstname', 'lastname', 'email', 'password', 'usertype', 'employeeNo', 'agencyName']), body('password').isLength({min: 5}), async (req, res) => {
		    const errors = validationResult(req);
		    if (!errors.isEmpty()) {
		      return res.status(422).json({ errors: errors.array() })
		    }

			let query_exec = await this.registerUser(req.body);

			// Returns 409 if user already exists
			if(!query_exec['success']) return res.status(409).json(query_exec)
			else return res.send(query_exec)
		}); 

		this.router.post('/login', body(['email', 'password']).not().isEmpty(),async (req, res) => {
			const errors = validationResult(req);
		    if (!errors.isEmpty()) {
		      return res.status(422).json({ errors: errors.array() })
		    }
		    let query_exec = await this.loginUser(req.body);

			// Returns 401 if the credentials are incorrect
			if (!query_exec['success']) return res.status(401).json(query_exec)
			else return res.send(query_exec)
		});
		
		this.router.post('/getName', body(['userid']).not().isEmpty(), async(req, res) => {
			let firstName = await getDB().getFirstname(req.body.UserID)
			let surname = await getDB().getLastname(req.body.UserID)
			return res.send({text: firstName + " " + surname})
		});
		this.router.post('/createListing', body(['address1', 'address2', 'city', 'county', 'postcode', 'landlordID', 'country', 'isRoom', 'rent']), async (req, res) => {
			console.log(req.body)
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

		this.router.post('/getListing', body(['ListingID']).not().isEmpty(), async (req,res) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()){
				return res.status(422).json({ errors: errors.array() })
			}
			let address = [
				await this.getAddressLine1(req.body.ListingID),
				await this.getAddressLine2(req.body.ListingID),
				await this.getCity(req.body.ListingID),
				await this.getCounty(req.body.ListingID),
				await this.getPostcode(req.body.ListingID),
				await this.getCountry(req.body.ListingID),
				await this.getIsRoom(req.body.ListingID)
			]
			return res.send(address)
		});

		this.router.post('/getAllListings', body(['UserID']).not().isEmpty(), async(req, res) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()){
				return res.status(422).json({ errors: errors.array() })
			}
			return res.send(await getDB().getAllListingsForUser(req.body.UserID))
		});

		this.router.get('/getAllListingsFromSystem', async(req, res) => {
			console.log("GET request recieved")
			return res.send(await getDB().getAllListingsFromSystem())
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