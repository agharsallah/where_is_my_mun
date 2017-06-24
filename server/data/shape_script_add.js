var axios = require('axios');
var fs = require('fs');
const path = require('path')
import config from './config'

fs.readdir('./shapes', (err, files) => {
//Loop through files and get file name 
  files.forEach(file => {
    const dir='./shapes/'+file;
    const delExtens=/(.*)\./g;
    const gouvernorate_name = delExtens.exec(file); //file name without extension

    var qString=config.apiUrl+"/api/addshape";

    fs.readFile(dir, 'utf8', function(err, data) {
    	 
    	 axios({
            method: 'post',
            url: qString,
			headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            },
			data: {
    			name: gouvernorate_name[1],
    			data: data
  			}
        })
	    .then(response=>{
	        //console.log(response.data.data)
	                console.log('we posted data into db');
	        }
	    )
	    .catch(function (error) {
	        console.log(error);
	    });

	})

    
  });
})

              