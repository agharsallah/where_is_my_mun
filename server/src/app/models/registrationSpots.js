var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RegistrationSchema   = new Schema({
	data: { type: Object, required: true }
});

module.exports = mongoose.model('RegistrationSpots', RegistrationSchema);