const Shape = require('../app/models/shape');

/**
 * Fetch polling Center of 
 */
export const getShape = (req, res, next) => {

	Shape.findOne({name:req.params.gouv}, function(err, datashape) {
			if (err) { return next(err); }

			res.json(datashape);
		});
};

export const postShape = (req, res, next) => {
    var shape = new Shape();		// create a new instance of the Bear model
		shape.name = req.body.name;  // set the bears name (comes from the request)
		shape.data = req.body.data;  // set the bears name (comes from the request)

		shape.save(function(err) {
			if (err) { return next(err); }

			res.json({ message: 'shape created!' });
		});

};