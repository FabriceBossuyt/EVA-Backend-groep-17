var mongoose   = require('mongoose');
var crypto     = require('crypto'); 

var GebruikerSchema = new mongoose.Schema({
          username         : { 
            type : String, 
            default: null
          },
          hashedPassword   :  {
            type : String, 
            default: null
          }, 
          naam             :  {
            type : String, 
            default: null
          },
          voornaam         :  {
            type : String, 
            default: null
          },
          gedaneChallenges : [],
          facebookId       :  {
            type : String, 
            default: null
          }, 
          facebookToken    :  {
            type : String, 
            default: null
          },
          googleId         :  {
            type : String, 
            default: null
          },
          googleToken      :  {
            type : String, 
            default: null
          },
          salt             :  {
            type : String, 
            default: null
          }, 
          aantalDagen      :{
            type: Number, 
            default: 0
          },
          student : String, 
          geslacht : String, 
          vegetarisch : String
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