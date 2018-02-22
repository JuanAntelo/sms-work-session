var http = require('http');
var request=require('request');

var endpointA = require('./endpoints/a')
var endpointB = require('./endpoints/b');

function errCheck(err, res) {
	hasErrOccured = false;

  	if(err) {
  		hasErrOccured = true;
  		errMsg = err;
  	}

  	if(res.statusCode !== 200 ) {
  		hasErrOccured = true;
  		errMsg = 'Non 200 response, server returned : ' + res.statusCode;
  	}

	return {
		errOccured: false,
		errMsg : errMsg
	}
}

const express = require('express')
const app = express()

app.get('/calc', (req,res) => {

})

app.get('/', (req, res) => {
	res.sendFile( __dirname + "/public/" + "index.html" );	
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))


request.get(endpointB, function(err,res,body){
  var errCheck = errCheck(err, res);

  if(errCheck.errOccured) {

  }

  console.log(JSON.parse(res.body).val_2);
});

request.get(endpointA ,function(err,res,body){

  console.log(JSON.parse(res.body).val1);
  //TODO Do something with response
});
