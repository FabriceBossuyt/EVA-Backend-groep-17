var mongoose = require('mongoose');

var ReceptSchema = new mongoose.Schema({
    receptID: String,
    receptUrl: String,
    titel: String,
    imageUrl: String,
    receptTekst:String
});

module.exports = mongoose.model('Recept', ReceptSchema);