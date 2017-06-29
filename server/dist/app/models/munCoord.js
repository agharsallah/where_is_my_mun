'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MunCoordSchema = new Schema({
	data: { type: Object, required: true }
});

module.exports = mongoose.model('MunCoord', MunCoordSchema);