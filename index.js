const express = require('express')
const app = express()

var apiService = require('./services/api') ;

app.get('/calcA', (req,res) => {
	console.log('received call from calcA endpoint');
	apiService.callEndpointA(res);
})

app.get('/calcB', (req,res) => {
	console.log('received call from calcB endpoint');
	apiService.callEndpointB(res);
})

app.get('/', (req, res) => {
	res.sendFile( __dirname + "/public/" + "index.html" );	
});

app.listen(3000, () => console.log('NodeJS app listening on port 3000'))
