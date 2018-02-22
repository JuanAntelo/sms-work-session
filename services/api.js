var request=require('request');

var endpointA = require('../endpoints/a')
var endpointB = require('../endpoints/b');

function callEndpointA(clientResponse) {
	request.get(endpointA, function(err,res,body){
  		if(errCheck(err, res).errOccured) { 
  		  clientResponse.send(errCheck.errMsg);
  		  return;
  		}

  		var number = JSON.parse(res.body).val1;
  		clientResponse.send(number.toString());
  	});
}

function callEndpointB(clientResponse) {
	request.get(endpointB, function(err,res,body){
  		if(errCheck(err, res).errOccured) { 
  			res.send(errCheck.errMsg);
  		}

  		var number = JSON.parse(res.body).val_2;
  		clientResponse.send(number.toString()); // needs to be string to prevent nodeJS from thinking I'm sending status code
  	});
}

function errCheck(err, res) {
	var hasErrOccured = false;
	var errMsg = '';

  	if(err) {
  		hasErrOccured = true;
  		errMsg = err;
  	}

  	if(res.statusCode !== 200 ) {
  		hasErrOccured = true;
  		errMsg = 'Non 200 response, server returned : ' + res.statusCode;
  	}

	return {
		errOccured: hasErrOccured,
		errMsg : errMsg
	}
}

module.exports = {
	callEndpointA: callEndpointA,
	callEndpointB: callEndpointB,
}
