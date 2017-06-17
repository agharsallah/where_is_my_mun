var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StatisticSchema   = new Schema({
	ip: { type: String},
});

module.exports = mongoose.model('Statistic', StatisticSchema);