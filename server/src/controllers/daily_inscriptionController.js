const DailyIns = require('../app/models/dailyinscription');
var ip = require('ip');

/**
 * Fetch polling Center of 
 */
export const getDailyIns = (req, res, next) => {

	DailyIns.findOne({name:req.params.gouv}, function(err, datadailyInsShape) {
			if (err) { return next(err); }

			res.json(datadailyInsShape);
		});
};

export const postDailyIns = (req, res, next) => {
    var dailyInsShape = new DailyIns();		// create a new instance of the Bear model
		dailyInsShape.name = req.body.name;  // set the bears name (comes from the request)
		dailyInsShape.data = req.body.data;  // set the bears name (comes from the request)

		dailyInsShape.save(function(err) {
			if (err) { return next(err); }

			res.json({ message: 'dailyInsShape created!' });
		});

};