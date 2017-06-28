const MunCoord = require ('../app/models/munCoord');

/**
 * Fetch Irie Center of 
 */
export const getOneMunCoord = (req, res, next) => {
  MunCoord.find({"data.city_en":req.params.gouv}, function(err, regspot) {
			if (err) { return next(err); }

			res.json(regspot);
		});
};

export const getMunCoords = (req, res, next) => {
  		MunCoord.find({}, function(err, regspot) {
			if (err) { return next(err); }

			console.log(regspot); res.json(regspot);
		});
};
export const postMunCoord = (req, res, next) => {
    var munCoord = new MunCoord();		// create a new instance of the Bear model
		munCoord.data = req.body.data;  // set the bears name (comes from the request)
		munCoord.save(function(err) {
			if (err) { return next(err); }

			res.json( { message: ' mun coord created!' } );
		});

};