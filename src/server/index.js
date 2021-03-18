var express = require('express');
const os = require('os');
var app = express(); 
app.use(express.json());  

//sends LoginBox message to the console/backend server
app.post('/api/register', (req, res) => {
    //res.setHeader('Content-Type', 'application/json');
    var message = req.body;
    res.send(message)
    console.log('Got body: ', message);
}); 

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

