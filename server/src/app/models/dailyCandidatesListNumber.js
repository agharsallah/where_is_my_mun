var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ShapeSchema   = new Schema({
	name: { type: String, required: true },
	data: { type: Object, required: true },
	dateOfCollection:{type:String , required: true},
	timeOfCollection:{type:String , required: true}
});

module.exports = mongoose.model('CandidateListNumberShape', ShapeSchema);