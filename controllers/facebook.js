var Gebruiker 				= require('../models/gebruiker.js')
var passport            	= require('passport');
var crypto              	= require('crypto');
var UserModel               = require('../models/gebruiker');
var AccessTokenModel        = require('../models/accesstoken');
var RefreshTokenModel       = require('../models/refreshtoken');


exports.postFacebook = function(req, res){

	Gebruiker.findOne({'facebookId' : req.body.id}, function(err, gebruiker){

		if(gebruiker){
			//return done(null, gebruiker);
		} 
		else{
			var gebruiker = new Gebruiker()

			gebruiker.username 				= req.body.email; //req.body.email
			gebruiker.facebookToken			= req.body.token;
			gebruiker.facebookId 			= req.body.id;
			gebruiker.naam 					= req.body.naam;
			gebruiker.voornaam				= req.body.voornaam;
			gebruiker.password 				= 'simplepassword'

			gebruiker.save(function(err){
				if(err)
					res.send(err)

				res.json('Gebruiker toegevoegd')
			})
		}
	})
};


