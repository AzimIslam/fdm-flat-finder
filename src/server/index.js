const express = require('express');
const UserService = require('./modules/user/index.js');
const path = require('path')
const app = express();

const { connectDB } = require('./modules/db/index.js');
//const router = express.Router();
//const session = require('express-session');
//const bodyParser = require('body-parser');


//create new login function passing event as parameter
/*
router.get('/', (req,res) => {
	console.log("hello");
	sess=req.session; //current assigned session

	res.send("welcome to the page");
	//session variables
	sess.email;	
	sess.userID = 1;
	console.log(sess.userID); 
	res.end('done');
});
*/


const startUp = async () => {
	app.get('/login', async (req, res) => {
		try {
			
			let user = await getDB().getUserID(loginDetails.email);
			if(user !== null) {
				req.session.user = {
					userID: user.UserID,
				};
				res.redirect('/account');
			}
			else {
				res.send("Login error");
			}
		} catch (error) {
			res.sendStatus(500);
		}
	});
	
	app.get('/account', (req, res) => {
		if (!req.session.user) {
			res.redirect('login');
		}
		else {
			res.render('account', {user: req.session.user});
		}
	});
	
	app.get('/logout', (req, res) => {
		if (req.session.user) {
			delete req.session.user;
			res.redirect('/login');
		} else {
			res.redirect('/');
		}
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