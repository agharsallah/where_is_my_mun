'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PollingSchema = new Schema({
	name: { type: String },
	data: { type: Object, required: true }
});

module.exports = mongoose.model('Polling', PollingSchema);