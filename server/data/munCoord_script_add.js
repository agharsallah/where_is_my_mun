var axios = require('axios');
var fs = require('fs');
var munCoord= require('./munCoord/munCoord.json')
var config = require('./config.js')
var request = require('request');
console.log(munCoord);
//map through thee Irie Array Object
for (var i = 0; i < munCoord.length; i++) {
		var qString=config.apiUrl+"/api/addmuncoord";
		var options = {
			url: qString,
			headers: {
				'name': 'Isie',
				'password': 'Isie@ndDi',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			 form: {
					data: munCoord[i]
  			} 
		}
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log('Posted to DB');
			}else{
				console.log(error);
			}
		}

		request.post(options, callback);
	
}


              