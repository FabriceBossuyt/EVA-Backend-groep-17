var mongoose = require('mongoose')

var RefreshTokenSchema = new mongoose.Schema({
	userId		:  String,
	clientId	:  String,
    token 		:  String,
    created		:  {
         type	:  Date,
         default:  Date.now
    }
})

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);