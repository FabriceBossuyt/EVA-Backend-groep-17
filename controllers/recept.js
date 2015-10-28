var Recept = require('../models/recept.js');

exports.postRecepts = function(req, res){
	var  recept = new Recept();

	console.log(req.body);

	//set recept properties from body here
	recept.receptUrl 	= req.body.receptUrl;
	recept.titel 		= req.body.Titel;
	recept.imageUrl 	= req.body.imageUrl;

	//save recept
	recept.save(function(err){
		if (err)
			res.send(err);

		//or change to http responsemessage
		res.json({message: 'Recept added'})
	})
};

exports.getRecepts = function(req, res){
	//err -> error when error
	// recepten -> all recepten on succes
	Recept.find(function(err, recepten){
		if (err)
			res.send(err);

		res.json({data : recepten});
	})
}

exports.getRecept = function(req, res){
	Recept.findById(req.params.recept_id, function(err, recept){
		if(err)
			res.send(err);

		res.json({data : recept});
	})
}

exports.putRecept = function(req, res) {
  // Use the Beer model to find a specific beer
  Recept.findById(req.params.recept_id, function(err, recept) {
    if (err)
      res.send(err);

    // Update the recept attr
    recept.name = req.body.name;

    // Save the beer and check for errors
    recept.save(function(err) {
      if (err)
        res.send(err);

      res.json({message: 'Recept saved', recept});
    });
  });
};

exports.deleteRecept = function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  Recept.findByIdAndRemove(req.params.recept_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Recept removed!' });
  });
};