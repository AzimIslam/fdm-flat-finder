/*
var express = require('express');
var session = require('express-session');

const app = express();

//sets the timeout to 1 hour in a constant
const one_hour = 1000 * 60 * 60;

app.use(session({
	secret: "cat"
}))

app.get('/', function(req,res){
	if(req.session.page_views){
		req.session.page_views++;
		res.send("You visited this page " + req.session.page_views + "times");
	}
	else {
	req.session.page_views = 1;
	res.send("Welcome to the page");
	console.log("hello")
	}
});

app.listen(8081, console.log("Hello port 8080"))
*/

/*const IN_PROD = NODE_ENV === 'production'

var userID = await getDB().getUserID(loginDetails.email)

app.get('/', (req, res) => {
	var {userID} = req.session.name;

	res.send(`
		<h1>Welcome</h1>
		${userID ? `
			<a href='/home'>Home</a>
		` : `
		<a href='/login'>Login</a>
		`}
	`)
})

app.login('/login', (req,res) => {
	//req.session.userID =
	res.send(
		
	)
})*/