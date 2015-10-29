var mongoose   = require('mongoose');

var AccessTokenSchema = new mongoose.Schema({
	userId		: String,
	clientId	: String,
    token 		: String,
    created		: {
         type	: Date,
         default: Date.now
    }
})

module.exports = mongoose.model('AccessToken', AccessTokenSchema);