'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var regshape = require('../app/models/regshape');
var ip = require('ip');

/**
 * Fetch polling Center of 
 */
var getregshape = exports.getregshape = function getregshape(req, res, next) {

	regshape.findOne({ name: req.params.gov }, function (err, datashape) {
		if (err) {
			return next(err);
		}

		res.json(datashape);
	});
};

var postregshape = exports.postregshape = function postregshape(req, res, next) {
	var shape = new regshape(); // create a new instance of the Bear model
	shape.name = req.body.name; // set the bears name (comes from the request)
	shape.data = req.body.data; // set the bears name (comes from the request)

	shape.save(function (err) {
		if (err) {
			return next(err);
		}

		res.json({ message: 'shape created!' });
	});
};