var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PollingSchema   = new Schema({
	name: { type: String, required: true, index: { unique: true } },
	data: { type: Array, required: true }
});

module.exports = mongoose.model('Polling', PollingSchema);