var axios = require('axios');
var fs = require('fs');
var Irie= require('./Irie/Irie.json')
import config from './config'

//map through thee Irie Array Object
for (var i = 0; i < Irie.length; i++) {
		var qString=config.apiUrl+"/api/addirie";
			axios({
					method: 'post',
					url: qString,
					headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            },
					data: {
						name: Irie[i].city_en,
						data: Irie[i]
					}
        		}) 
	    .then(response=>{
	        //console.log(response.data.data)
	        console.log(' posted data into db');
	    }
	    )
	    .catch(function (error) {
	        console.log(error);
	    });
	
}


              