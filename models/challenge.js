var mongoose   = require('mongoose');
var ChallengeSchema = new mongoose.Schema({
	name: String
});

module.exports = mongoose.model('Challenge', ChallengeSchema);