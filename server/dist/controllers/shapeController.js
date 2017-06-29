'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Shape = require('../app/models/shape');
var ip = require('ip');

/**
 * Fetch polling Center of 
 */
var getShape = exports.getShape = function getShape(req, res, next) {

	Shape.findOne({ name: req.params.gouv }, function (err, datashape) {
		if (err) {
			return next(err);
		}

		res.json(datashape);
	});
};

var postShape = exports.postShape = function postShape(req, res, next) {
	var shape = new Shape(); // create a new instance of the Bear model
	shape.name = req.body.name; // set the bears name (comes from the request)
	shape.data = req.body.data; // set the bears name (comes from the request)

	shape.save(function (err) {
		if (err) {
			return next(err);
		}

		res.json({ message: 'shape created!' });
	});
};