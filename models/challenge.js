var mongoose   = require('mongoose');
var ChallengeSchema = new mongoose.Schema({
	_id: String,
	Omschrijving: String,
	Titel: String
});

module.exports = mongoose.model('Challenge', ChallengeSchema);