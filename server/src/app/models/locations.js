var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LocationsSchema   = new Schema({
	lat: { type: String},
	lng:{ type: String},
	searchedTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Locations', LocationsSchema);