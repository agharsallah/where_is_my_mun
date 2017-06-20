var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var IrieSchema   = new Schema({
	name: { type: String},
	data: { type: Object, required: true }
});

module.exports = mongoose.model('Irie', IrieSchema);