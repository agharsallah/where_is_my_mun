'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Irie = require('../app/models/irie');

/**
 * Fetch Irie Center of 
 */
var getIrie = exports.getIrie = function getIrie(req, res, next) {
	Irie.find({ name: req.params.gouv }, function (err, datashape) {
		if (err) {
			return next(err);
		}

		res.json(datashape);
	});
};

var getAllIrie = exports.getAllIrie = function getAllIrie(req, res, next) {
	Irie.find({}, function (err, datashape) {
		if (err) {
			return next(err);
		}

		console.log(datashape);res.json(datashape);
	});
};
var postIrie = exports.postIrie = function postIrie(req, res, next) {
	var irie = new Irie(); // create a new instance of the Bear model
	irie.name = req.body.name; // set the bears name (comes from the request)
	irie.data = req.body.data; // set the bears name (comes from the request)
	irie.save(function (err) {
		if (err) {
			return next(err);
		}

		res.json({ message: req.body.name + ' Irie created!' });
	});
};