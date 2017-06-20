const Irie = require ('../app/models/irie');

/**
 * Fetch Irie Center of 
 */
export const getIrie = (req, res, next) => {
  Irie.find({name:req.params.gouv}, function(err, datashape) {
			if (err) { return next(err); }

			res.json(datashape);
		});
};

export const getAllIrie = (req, res, next) => {
  Irie.find({}, function(err, datashape) {
			if (err) { return next(err); }

			res.json(datashape);
		});
};
export const postIrie = (req, res, next) => {
    var irie = new Irie();		// create a new instance of the Bear model
		irie.name = req.body.name;  // set the bears name (comes from the request)
		irie.data = req.body.data;  // set the bears name (comes from the request)
		irie.save(function(err) {
			if (err) { return next(err); }

			res.json( { message: req.body.name+' Irie created!' } );
		});

};