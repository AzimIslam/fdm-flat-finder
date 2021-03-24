var express = require('express');
const os = require('os');
//var bodyParser= require('body-parser')
var app = express(); 
//app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());  


app.post('/api/register', (req, res) => {
    //res.setHeader('Content-Type', 'application/json');
    var message = req.body;
    res.send(message)
    console.log('Got body: ', message);
}); 

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

