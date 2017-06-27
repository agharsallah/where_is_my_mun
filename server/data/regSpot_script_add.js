var axios = require('axios');
var fs = require('fs');
var Irie= require('./registration/regSpots.json')
var config = require('./config.js')
var request = require('request');

//map through thee Irie Array Object
for (var i = 0; i < Irie.length; i++) {
		var qString=config.apiUrl+"/api/addregspots";
		var options = {
			url: qString,
			headers: {
				'name': 'Isie',
				'password': 'Isie@ndDi',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			 form: {
					data: Irie[i]
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


              