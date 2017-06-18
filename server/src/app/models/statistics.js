var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StatisticsSchema   = new Schema({
	ip: { type: String},
	city:{ type: String},
	searchedAdress:{ type: String},
	result:{ type: String},
	service: { type: String},
	searchedTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Statistics', StatisticsSchema);