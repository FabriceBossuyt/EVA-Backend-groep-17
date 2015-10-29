var mongoose   = require('mongoose');
var ChallengeSchema = new mongoose.Schema({
	_id: String,
	Omschrijving:  {
            type : String, 
            default: null
          },
	Titel:  {
            type : String, 
            default: null
          }
});

module.exports = mongoose.model('Challenge', ChallengeSchema);