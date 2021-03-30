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

	async getUserType(UserID) {
		let result = await this.instance.get("SELECT UserType FROM Users WHERE UserID = ?", [UserID])
		return result.UserType;
	}

	async getFirstname(UserID) {
		let result = await this.instance.get("SELECT FirstName FROM Users WHERE UserID = ?", [UserID])
		return result.FirstName;
	}

	async getLastname(UserID) {
		let result = await this.instance.get("SELECT LastName FROM Users WHERE UserID = ?", [UserID])
		return result.Lastname;
	}

	async getEmail(UserID) {
		let result = await this.instance.get("SELECT Email FROM Users WHERE UserID = ?", [UserID])
		return result.Email;
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

}

module.exports.connectDB = async (path) => {
	_instance = await (new Database(path)).instantiate();
}

module.exports.getDB = () => _instance;