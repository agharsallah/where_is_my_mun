const RegistrationSpots = require ('../app/models/registrationSpots');

/**
 * Fetch Irie Center of 
 */
export const getOneRegistrationSpot = (req, res, next) => {
  RegistrationSpots.find({"data.city_en":req.params.gouv}, function(err, regspot) {
			if (err) { return next(err); }

			res.json(regspot);
		});
};

export const getRegistrationSpots = (req, res, next) => {
  RegistrationSpots.find({}, function(err, regspot) {
			if (err) { return next(err); }

			console.log(regspot); res.json(regspot);
		});
};
export const postRegistrationSpot = (req, res, next) => {
    var regSpot = new RegistrationSpots();		// create a new instance of the Bear model
		regSpot.data = req.body.data;  // set the bears name (comes from the request)
		regSpot.save(function(err) {
			if (err) { return next(err); }

			res.json( { message: ' Reg spot created!' } );
		});

};