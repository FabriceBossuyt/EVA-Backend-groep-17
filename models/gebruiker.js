var mongoose   = require('mongoose');
var crypto     = require('crypto'); 

var GebruikerSchema = new mongoose.Schema({

          username            : String, 
          hashedPassword   : String, 
          naam             : String, 
          voornaam         : String,
          gedaneChallenges : [],
          facebookId       : String, 
          facebookToken    : String,
          googleId         : String,
          googleToken      : String,
          salt             : String, 
          aantalDagen      : Number, 
});

GebruikerSchema.methods.encryptPassword = function(password){
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

GebruikerSchema.virtual('userId')
  .get(function(){
    return this.id;
  });

GebruikerSchema.virtual('password')
  .set(function(password){
    this._plainPassword = password;
    this.salt = crypto.randomBytes(32).toString('hex');
    this.hashedPassword = this.encryptPassword(password);
  });

  GebruikerSchema.methods.checkPassword = function(password){
    return this.encryptPassword(password) === this.hashedPassword;
  }

module.exports = mongoose.model('Gebruiker', GebruikerSchema);