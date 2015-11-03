var Gebruiker 	= require('../models/gebruiker.js');

exports.postGebruikers = function(req, res){

	Gebruiker.findOne({'username': req.body.email}, function(err, gebruiker){
		console.log(req.body)
		console.log(gebruiker)
		if (gebruiker){
			res.status(400).send('Gebruiker bestaat al')
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

			res.send('Gebruiker added')
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
    gebruiker.name = req.body.name;

    // Save the beer and check for errors
    gebruiker.save(function(err) {
      if (err)
        res.send(err);

      res.json({message: 'Gebruiker saved', gebruiker});
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


