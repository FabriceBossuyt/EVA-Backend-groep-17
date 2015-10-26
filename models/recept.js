var mongoose   = require('mongoose');

var ReceptSchema = new mongoose.Schema({
	name: String
});

module.exports = mongoose.model('Recept', ReceptSchema);