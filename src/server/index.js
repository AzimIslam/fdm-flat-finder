const express = require('express');
const UserService = require('./modules/user/index.js');
const path = require('path')
const app = express();
const { connectDB } = require('./modules/db/index.js');

var session = require('express-session');

const startUp = async () => {


	app.use(session(
		{
			secret: 'cat',
			//saveUninitialized: true,
			//resave: true
			cookie:{
				maxAge: 1000*60*60 //one hour till timeout when session created	
			}
		}
	));

	var sess; //global session variable need to change later for multiple users

	app.get('/', (req,res) => {
		console.log("hello");
		sess=req.session; //current assigned session

		res.send("welcome to the page");
		//session variables
		sess.email;	
		sess.userID; 
	});

	const services = [
		new UserService("/api/user")
	]
	await connectDB(path.resolve(__dirname, "./modules/db/database.db"))
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))

	services.forEach((service) => {
    	app.use(service.path, service.router);
	});

	await app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
}

startUp();