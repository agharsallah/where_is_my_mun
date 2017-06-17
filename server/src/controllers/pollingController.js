const Polling = require ('../app/models/polling');

/**
 * Fetch polling Center of 
 */
export const getPolling = (req, res, next) => {
  Polling.find({name:req.params.gouv}, function(err, datashape) {
			if (err) { return next(err); }

			res.json(datashape);
		});
};

export const postPolling = (req, res, next) => {
    var polling = new Polling();		// create a new instance of the Bear model
		polling.name = req.body.name;  // set the bears name (comes from the request)
		polling.data = req.body.data;  // set the bears name (comes from the request)
		polling.save(function(err) {
			if (err) { return next(err); }

			res.json( { message: req.body.name+' polling created!' } );
		});

};