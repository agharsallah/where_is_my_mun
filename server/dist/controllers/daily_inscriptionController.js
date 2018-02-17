'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var DailyIns = require('../app/models/dailyinscription');
var ip = require('ip');

/**
 * Fetch polling Center of 
 */
var getDailyIns = exports.getDailyIns = function getDailyIns(req, res, next) {

	DailyIns.findOne({ name: req.params.gouv }, function (err, datadailyInsShape) {
		if (err) {
			return next(err);
		}

		res.json(datadailyInsShape);
	});
};

var postDailyIns = exports.postDailyIns = function postDailyIns(req, res, next) {
	var dailyInsShape = new DailyIns(); // create a new instance of the Bear model
	dailyInsShape.name = req.body.name; // set the bears name (comes from the request)
	dailyInsShape.data = req.body.data; // set the bears name (comes from the request)

	dailyInsShape.save(function (err) {
		if (err) {
			return next(err);
		}

		res.json({ message: 'dailyInsShape created!' });
	});
};