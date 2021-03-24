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
		return await this.instance.get("SELECT Password from 'Users' WHERE Email = ?", [email])
	}
	async registerUser({ firstname, lastname, email, password, usertype }) {
		let user = await this.instance.get("SELECT * from Users WHERE Email = ?", [email])
		if(user != undefined){
			return{'error': "User already registered"}
		}
		await this.instance.run("INSERT into Users (FirstName, LastName, Email, Password, UserType) Values(?,?,?,?,?)", firstname, lastname, email, password, usertype)
		return {'message': "User registered"}
	}
}

module.exports.connectDB = async (path) => {
	_instance = await (new Database(path)).instantiate();
}

module.exports.getDB = () => _instance;