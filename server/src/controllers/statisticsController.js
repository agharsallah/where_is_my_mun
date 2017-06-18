const Statistics = require ('../app/models/statistics');
var ip = require('ip');

export const postStatistics = (req, res, next) => {
	var ipAddress= ip.address()+'-'+req.headers['x-forwarded-for'];
    var statistics = new Statistics();
		statistics.ip = ipAddress;  
		statistics.city = req.body.city;  
		statistics.searchedAdress = req.body.searchedAdress;  
		statistics.result = req.body.result;  
		statistics.service = req.body.service;  
		statistics.searchedTime = req.body.searchedTime;  
		statistics.save(function(err) {
			if (err) { return next(err); }

			res.json( { message: req.body.searchedAdress+' saved !' } );
		});

};