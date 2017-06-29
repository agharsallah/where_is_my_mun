'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var MunCoord = require('../app/models/munCoord');

/**
 * Fetch Irie Center of 
 */
var getOneMunCoord = exports.getOneMunCoord = function getOneMunCoord(req, res, next) {
	MunCoord.find({ "data.city_en": req.params.gouv }, function (err, regspot) {
		if (err) {
			return next(err);
		}

		res.json(regspot);
	});
};

var getMunCoords = exports.getMunCoords = function getMunCoords(req, res, next) {
	MunCoord.find({}, function (err, regspot) {
		if (err) {
			return next(err);
		}

		console.log(regspot);res.json(regspot);
	});
};
var postMunCoord = exports.postMunCoord = function postMunCoord(req, res, next) {
	var munCoord = new MunCoord(); // create a new instance of the Bear model
	munCoord.data = req.body.data; // set the bears name (comes from the request)
	munCoord.save(function (err) {
		if (err) {
			return next(err);
		}

		res.json({ message: ' mun coord created!' });
	});
};