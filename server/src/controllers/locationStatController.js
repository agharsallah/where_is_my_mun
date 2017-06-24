const Locations = require ('../app/models/locations');

export const postLoctionStat = (req, res, next) => {
    var locations = new Locations();
		locations.lat = req.body.lat;  
		locations.lng = req.body.lng;  
		locations.searchedTime = req.body.searchedTime;  
		locations.save(function(err) {
			if (err) { return next(err); }

			res.json( { message: ' loc sav' } );
		});

};