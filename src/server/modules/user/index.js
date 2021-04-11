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
			let firstName = await getDB().getFirstName(req.body.UserID)
			let surname = await getDB().getLastName(req.body.UserID)
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
			let address = {
				address1: await getDB().getAddressLine1(req.body.ListingID),
				address2: await getDB().getAddressLine2(req.body.ListingID),
				city: await getDB().getCity(req.body.ListingID),
				county: await getDB().getCounty(req.body.ListingID),
				postcode: await getDB().getPostcode(req.body.ListingID),
				country: await getDB().getCountry(req.body.ListingID),
				rent: await getDB().getRent(req.body.ListingID),
			}
			return res.send(address)
		});

		this.router.post('/getListingForMember', body(['ListingID']).not().isEmpty(), async(req, res) => {
			const errors = validationResult(req);
			if(!errors.isEmpty()) {
				return res.status(422).json({ errors: errors.array() })
			}
			let details = await getDB().getListingForMember(req.body.ListingID);
			return res.send(details);
		});

		this.router.post('/editListing', body(['address1', 'address2', 'city', 'county', 'postcode', 'country', 'RentPerMonth', 'ListingID']), async (req, res) => {
			console.log(req.body)
			return res.send(await this.editListing(req.body))
		});

		this.router.post('/editUser', body(['firstname', 'lastname', 'password', 'agencyName', 'UserID']), async(req,res) => {
			return res.send(await this.editUser(req.body))
		});
		
		this.router.post('/applySearchFilter', body(['maxRent','city','county','country','isRoom','isFlat', 'sortByCheapest']), async (req,res) => {
			return res.send(await this.applySearchFilter(req.body))
		});

		this.router.post('/getAllListings', body(['UserID']).not().isEmpty(), async(req, res) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()){
				return res.status(422).json({ errors: errors.array() })
			}
			return res.send(await getDB().getAllListingsForUser(req.body.UserID))
		});

		this.router.post('/applySearchFilter', body(['maxRent','city','county','country','isRoom','sortByCheapest']), async (req,res) => {
			return res.send(await getDB().applySearchFilter(req.body))
		});

		this.router.post('/createSupportTicket', body(['title', 'description', 'userID']), async (req, res) => {
			return res.send(await this.supportTicket(req.body))
		});

		this.router.get('/getAllListingsFromSystem', async(req, res) => {
			console.log("GET request recieved")
			return res.send(await getDB().getAllListingsFromSystem())
		});
	}



	async supportTicket(ListingDetails){
		return await getDB().createTicket(TicketDetails)
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

	async editUser(editDetails){
		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(editDetails.password, salt);
		editDetails.password = hash
		return await getDB().updateUser(editDetails)
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

	async editListing(editDetails){
		return await getDB().editListing(editDetails)
	}

	async applySearchFilter(FilterDetails){
		let WhereStr = "SELECT ListingID, AddressLine1, AddressLine2, City, County, Postcode, Country, IsRoom, Email, RentPerMonth, AgencyName FROM Advertisements WHERE ListingID IS NOT NULL"
		if (FilterDetails.maxRent != null && FilterDetails.maxRent != "") {
			WhereStr = (WhereStr + " AND RentPerMonth < " + FilterDetails.maxRent)
		}
		if (FilterDetails.city != null && FilterDetails.city != ""){
			WhereStr = (WhereStr + " AND City = '" + FilterDetails.city + "'")
		}
		if (FilterDetails.county != null && FilterDetails.county != ""){
			WhereStr = (WhereStr + " AND County = '"+ FilterDetails.county + "'")
		}
		if (FilterDetails.country != null && FilterDetails.country != "") {
			WhereStr = (WhereStr + " AND Country = '" + FilterDetails.country + "'")
		}
		if (FilterDetails.isRoom == true && FilterDetails.isFlat != true){
			WhereStr = (WhereStr + " AND isRoom = 1")
		} 
		if (FilterDetails.isFlat == true && FilterDetails.isRoom != true){
			WhereStr = (WhereStr + " AND isRoom = 0")
		} 
		if (FilterDetails.sortByCheapest != false){
			WhereStr = (WhereStr + " ORDER BY RentPerMonth ASC")
		}

		return await getDB().Search(WhereStr)
	}
}