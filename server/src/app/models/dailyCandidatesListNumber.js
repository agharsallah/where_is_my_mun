var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ShapeSchema   = new Schema({
	name: { type: String, required: true, index: { unique: true } },
	data: { type: Object, required: true },
	dateOfCollection:{type:String},
	timeOfCollection:{type:String}
});

module.exports = mongoose.model('CandidateListNumberShape', ShapeSchema);