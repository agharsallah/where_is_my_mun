var axios = require('axios');
var fs = require('fs');
var Irie= require('./Irie/Irie.json')
var config = require('./config.js')
var request = require('request');

//map through thee Irie Array Object
for (var i = 0; i < Irie.length; i++) {
		var qString=config.apiUrl+"/api/addirie";
		var options = {
			url: qString,
			headers: {
				'name': 'Isie',
				'password': 'Isie@ndDi',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			 form: {
					name: Irie[i].city_en,
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


              