const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite')

let _instance


class Database{
	constructor(path) {
		this.path = path;
	}

	async instantiate() {
		this.instance = await open({
			filename: this.path,
			driver: sqlite3.Database
		})
		return this;
	}

	async getUserPasswordHash(email) {
		return await this.instance.get("SELECT UserID, Password from 'Users' WHERE Email = ?", [email])
	}
	async registerUser({ firstname, lastname, email, password, usertype, employeeNo, agencyName }) {
		let user = await this.instance.get("SELECT * from Users WHERE Email = ?", [email])
		if(user != undefined){
			return{'error': "User already registered"}
		}
		await this.instance.run("INSERT into Users (FirstName, LastName, Email, Password, UserType, EmployeeNo, AgencyName) Values(?,?,?,?,?,?,?)", firstname, lastname, email, password, usertype, employeeNo, agencyName)
		return {'message': "User registered"}
	}
	async createListing({AddressLine1,AddressLine2,City,County,Postcode,LandlordID,Country,isRoom}){
		await this.instance.run("INSERT into Listings (AddressLine1, AddressLine2, City, County, Postcode, LandlordID, Country, isRoom) Values (?,?,?,?,?,?,?,?)", AddressLine1, AddressLine2, City, County, Postcode, LandlordID, Country,isRoom)
		return {'message': "Listing Created"}
	}
	async deleteListing({ListingID}){
		await this.instance.run("DELETE from Listings WHERE ListingID = ?", [ListingID])
		return {'message': "Listing Deleted"}
	}

	//this should get all listings
	async getAllListings(UserID){
		let result = await this.instance.get("SELECT * FROM Listings WHERE LandlordID = ?", [UserID])
		return {'messgae': result };
	}

	// User table getters 
	async getUserType(UserID) {
		let result = await this.instance.get("SELECT UserType FROM Users WHERE UserID = ?", [UserID])
		return result.UserType;
	}

	async getAgencyName(UserID){
		let result = await this.instance.get("SELECT AgencyName FROM Users WHERE UserID = ?", [UserID])
		return result.AgencyName;
	}

	async getEmployeeNo(UserID){
		let result = await this.instance.get("SELECT EmployeeNo FROM Users WHERE UserID = ?", [UserID])
		return result.EmployeeNo;
	}

	async getUserType(UserID){
		let result = await this.instance.get("SELECT UserType FROM Users WHERE UserID = ?", [UserID])
		return result.UserType;
	}

	async getPassword(UserID){
		let result = await this.instance.get("SELECT Password FROM Users WHERE UserID = ?", [UserID])
		return result.Password;
	}

	async getFirstName(UserID) {
		let result = await this.instance.get("SELECT FirstName FROM Users WHERE UserID = ?", [UserID])
		return result.FirstName;
	}

	async getLastName(UserID) {
		let result = await this.instance.get("SELECT LastName FROM Users WHERE UserID = ?", [UserID])
		return result.LastName;
	}

	async getEmail(UserID) {
		let result = await this.instance.get("SELECT Email FROM Users WHERE UserID = ?", [UserID])
		return result.Email;
	}

	//Listing table getters
	async getAddressLine1(ListingID) {
		let result = await this.instance.get("SELECT AddressLine1 FROM Listings WHERE ListingID = ?", [ListingID])
		return result.AddressLine1;
	}

	async getAddressLine2(ListingID) {
		let result = await this.instance.get("SELECT AddressLine2 FROM Listings WHERE ListingID = ?", [ListingID])
		return result.AddressLine2;
	}

	async getCity(ListingID) {
		let result = await this.instance.get("SELECT City FROM Listings WHERE ListingID = ?", [ListingID])
		return result.City;
	}

	async getCounty(ListingID) {
		let result = await this.instance.get("SELECT County FROM Listings WHERE ListingID = ?", [ListingID])
		return result.County;
	}

	async getPostcode(ListingID) {
		let result = await this.instance.get("SELECT Postcode FROM Listings WHERE ListingID = ?", [ListingID])
		return result.Postcode;
	}

	async getLandlordID(ListingID) {
		let result = await this.instance.get("SELECT LandlordID FROM Listings WHERE ListingID = ?", [ListingID])
		return result.LandlordID;
	}

	async getCountry(ListingID) {
		let result = await this.instance.get("SELECT Country FROM Listings WHERE ListingID = ?", [ListingID])
		return result.Country;
	}

	async getIsRoom(ListingID) {
		let result = await this.instance.get("SELECT IsRoom FROM Listings WHERE ListingID = ?", [ListingID])
		return result.IsRoom
	}
}

module.exports.connectDB = async (path) => {
	_instance = await (new Database(path)).instantiate();
}

module.exports.getDB = () => _instance;