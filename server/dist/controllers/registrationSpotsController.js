'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var RegistrationSpots = require('../app/models/registrationSpots');

/**
 * Fetch Irie Center of 
 */
var getOneRegistrationSpot = exports.getOneRegistrationSpot = function getOneRegistrationSpot(req, res, next) {
	RegistrationSpots.find({ "data.city_en": req.params.gouv }, function (err, regspot) {
		if (err) {
			return next(err);
		}

		res.json(regspot);
	});
};

var getRegistrationSpots = exports.getRegistrationSpots = function getRegistrationSpots(req, res, next) {
	RegistrationSpots.find({}, function (err, regspot) {
		if (err) {
			return next(err);
		}

		console.log(regspot);res.json(regspot);
	});
};
var postRegistrationSpot = exports.postRegistrationSpot = function postRegistrationSpot(req, res, next) {
	var regSpot = new RegistrationSpots(); // create a new instance of the Bear model
	regSpot.data = req.body.data; // set the bears name (comes from the request)
	regSpot.save(function (err) {
		if (err) {
			return next(err);
		}

		res.json({ message: ' Reg spot created!' });
	});
};