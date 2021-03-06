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
			return{'message': "User already registered", 'success': false}
		}
		await this.instance.run("INSERT into Users (FirstName, LastName, Email, Password, UserType, EmployeeNo, AgencyName) Values(?,?,?,?,?,?,?)", firstname, lastname, email, password, usertype, employeeNo, agencyName)
		return {'message': "User registered", 'success': true}
	}

	async updateUser({firstName, lastName, newPassword, agencyName, userID}) {
		await this.instance.run("UPDATE Users SET FirstName=?, LastName=?, Password=?, AgencyName=? WHERE UserID = ?", firstName,lastName,newPassword,agencyName,userID)
		return {success: 'true'};
	}

	async createListing({address1,address2,city,county,postcode,landlordID,country,isRoom, rent}){
		await this.instance.run("INSERT into Listings (AddressLine1, AddressLine2, City, County, Postcode, LandlordID, Country, isRoom, RentPerMonth) Values (?,?,?,?,?,?,?,?,?)", address1, address2, city, county, postcode, landlordID, country,isRoom, rent)
		return {success: true}
	}

	async deleteListing({ListingID}){
		await this.instance.run("DELETE from Listings WHERE ListingID = ?", [ListingID])
		return {'success': true}
	}

	async editListing({address1, address2, city, county, postcode, country, RentPerMonth, ListingID}) {
		await this.instance.run("UPDATE Listings SET AddressLine1=?, AddressLine2=?, City=?, County=?, Postcode=?, Country=?, RentPerMonth=? WHERE ListingID = ?", address1, address2, city, county, postcode, country, RentPerMonth, ListingID)
	}

	// User table getters 
	async getUpdatedUser(UserID){
		let result = await this.instance.get("SELECT FirstName, LastName, Email, AgencyName FROM Users WHERE UserID = ?", [UserID])
		return result;
	}
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

	async getRent(ListingID) {
		let result = await this.instance.get("SELECT RentPerMonth FROM Listings WHERE ListingID = ?", [ListingID])
		return result.RentPerMonth
	}

	async getAllListingsForUser(UserID) {
		let result = await this.instance.all("SELECT ListingID, AddressLine1, AddressLine2, City, County, Postcode, Country, IsRoom, RentPerMonth FROM Listings WHERE LandlordID = ?", [UserID])
		return result;
	}

	async getListingForMember(ListingID) {
		let result = await this.instance.get("SELECT AddressLine1, AddressLine2, City, County, Postcode, Country, RentPerMonth, Email, AgencyName, IsRoom FROM Advertisements WHERE ListingID = ?", [ListingID])
		return result;
	}

	//member getters (AKA mostly search)
	async getAllListingsFromSystem() {
		let result = await this.instance.all("SELECT ListingID, AddressLine1, AddressLine2, City, County, Postcode, Country, IsRoom, RentPerMonth, Email, AgencyName FROM Advertisements");
		return result;
	}

	async createTicket({title, description, userID}){
		//this needs to be adjusted to db names
		await this.instance.run("INSERT into SupportTicket (Title, Description, UserID) Values (?,?,?)", [title, description, userID])
		return {success: true}
	}

	async Search(WhereStr){
		let result = await this.instance.all(WhereStr)
		return result;
	}
}


module.exports.connectDB = async (path) => {
	_instance = await (new Database(path)).instantiate();
}

module.exports.getDB = () => _instance;