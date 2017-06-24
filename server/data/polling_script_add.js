var axios = require('axios');
var config = require('./config.js')
var request = require('request');

var fs = require('fs');
const path = require('path')
fs.readdir('./polling', (err, files) => {
//Loop through files and get file name 
  files.forEach(file => {
    const dir='./polling/'+file;
    const delExtens=/(.*)\./g;
    const gouvernorate_name = delExtens.exec(file); //file name without extension

    var qString=config.apiUrl+"/api/addpolling";
	var str = '';
    fs.readFile(dir, 'utf8', function(err, data) {
    	 str += data
		 var options = {
			url: qString,
			headers: {
				'name': 'Isie',
				'password': 'Isie@ndDi',
				'Content-type': 'application/x-www-form-urlencoded'
			},
			 form: {
				name: gouvernorate_name[1],
				data: JSON.parse(data)
  			} 
		}
		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log('Posted to DB');

			}else{
				console.log("error");
			}
		}

		request.post(options, callback);
		
	})

    
  });
})

              