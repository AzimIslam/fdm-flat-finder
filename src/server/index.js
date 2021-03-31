const express = require('express');
const UserService = require('./modules/user/index.js');
const path = require('path')
const app = express();
const { connectDB } = require('./modules/db/index.js');
const startUp = async () => {

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