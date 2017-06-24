var axios = require('axios');
import config from './config'

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
		axios({
					method: 'post',
					url: qString,
					headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            },
					data: {
						name: gouvernorate_name[1],
						data: JSON.parse(str)
					}
        		}) 
	    .then(response=>{
	        //console.log(response.data.data)
	        console.log(gouvernorate_name[1]+'posted data into db');
	    }
	    )
	    .catch(function (error) {
	        console.log("error");
	    });
	})

    
  });
})

              