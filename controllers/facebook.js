var Gebruiker = require('../models/gebruiker.js')

exports.postFacebook = function(req, res){

	Gebruiker.findOne({'facebookId' : req.body.id}, function(err, gebruiker){

		if(gebruiker){
			//return done(null, gebruiker);
		} 
		else{
			var gebruiker = new Gebruiker()

			gebruiker.email 				= req.body.email;
			gebruiker.facebookToken			= req.body.token;
			gebruiker.facebookId 			= req.body.id;
			gebruiker.naam 					= req.body.naam;
			gebruiker.voornaam				= req.body.voornaam;

			gebruiker.save(function(err){
				if(err)
					res.send(err)

				res.json('Gebruiker toegevoegd')
			})
		}
	})
};