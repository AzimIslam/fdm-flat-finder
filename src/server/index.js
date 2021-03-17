var express = require('express');
const os = require('os');
var bodyParser= require('body-parser')
var app = express(); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());  


app.post('/api/register', (req, res) => {
    //res.setHeader('Content-Type', 'application/json');
    res.send({message:"bye", secondM: req.body});
   
    console.log('Got body: ', req.body.message);
}); 

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

