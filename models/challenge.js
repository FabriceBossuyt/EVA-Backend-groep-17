var mongoose   = require('mongoose');
var ChallengeSchema = new mongoose.Schema({
	_id: String,
	omschrijving:  {
            type : String, 
            default: null
          },
	titel:  {
            type : String, 
            default: null
          }, 
    moeilijkheid: {
    	type: String, 
    	default: null
    }
});

module.exports = mongoose.model('Challenge', ChallengeSchema);