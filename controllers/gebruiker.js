var Gebruiker 		= require('../models/gebruiker.js');

exports.postGebruikers = function(req, res){

	Gebruiker.findOne({'username': req.body.email}, function(err, gebruiker){
		if (gebruiker){
			res.status(400).json('Gebruiker bestaat al')
		}
		else
		{
			var  gebruiker = new Gebruiker();

			//set gebruiker properties from body here
			gebruiker.username 		= req.body.email
			gebruiker.password 		= req.body.password
			gebruiker.naam			= req.body.naam
			gebruiker.voornaam		= req.body.voornaam
			gebruiker.student		= req.body.student
			gebruiker.geslacht 		= req.body.geslacht
			gebruiker.vegetarisch 	= req.body.vegetarisch
			//save gebruiker
			gebruiker.save(function(err){
				if (err)
					res.send(err);

			res.json('Gebruiker added')
			})
		}
	})
};

exports.getGebruikers = function(req, res){
	//err -> error when error
	// gebruikers -> all gebruikers on succes
	Gebruiker.find(function(err, gebruikers){
		if (err)
			res.send(err);

		res.json({data : gebruikers});
	})
}

exports.getGebruiker = function(req, res){
	Gebruiker.findById(req.params.gebruiker_id, function(err, gebruiker){
		if(err)
			res.send(err);

		res.json({data : gebruiker});
	})
}

exports.putGebruiker = function(req, res) {
  // Use the Beer model to find a specific beer
  Gebruiker.findById(req.params.gebruiker_id, function(err, gebruiker) {
    if (err)
      res.send(err);

    // Update the gebruiker attr
	if(req.body.username != null){
		gebruiker.username = req.body.username;
	}
	if(req.body.hashedPassword != null){
		gebruiker.hashedPassword = req.body.hashedPassword;
	}
	if(req.body.naam != null){
		gebruiker.naam = req.body.naam;
	}
	if(req.body.voornaam != null){
		gebruiker.voornaam = req.body.voornaam;
	}
	if(req.body.gedaneChallenges != null){
		gebruiker.gedaneChallenges = req.body.gedaneChallenges;
	}
	if(req.body.facebookId != null){
		gebruiker.facebookId = req.body.facebookId;
	}
	if(req.body.facebookToken != null){
		gebruiker.facebookToken = req.body.facebookToken;
	}
	if(req.body.googleId != null){
		gebruiker.googleId = req.body.googleId;
	}
	if(req.body.googleToken != null){
		gebruiker.googleToken = req.body.googleToken;
	}
	if(req.body.salt != null){
		gebruiker.salt = req.body.salt;
	}
	if(req.body.aantalDagen != null){
		gebruiker.aantalDagen = req.body.aantalDagen;
	}	
	if(req.body.student != null){
		gebruiker.student = req.body.student;
	}	
	if(req.body.geslacht != null){
		gebruiker.geslacht = req.body.vegetarisch;
	}	
	if(req.body.vegetarisch != null){
		gebruiker.vegetarisch = req.body.vegetarisch;
	}
    

    // Save the beer and check for errors
    gebruiker.save(function(err) {
      if (err)
        res.send(err);

      res.json({message: 'Gebruiker updated and saved', gebruiker});
    });
  });
};

exports.deleteGebruiker = function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  Gebruiker.findByIdAndRemove(req.params.gebruiker_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Gebruiker removed!' });
  });
};


