var User = require('../models/user.js');

exports.postUsers = function(req, res){
	var  user = new User();

	//set user properties from body here

	//save user
	user.save(function(err){
		if (err)
			res.send(err);

		//or change to http responsemessage
		res.json({message: 'User added'})
	})
};

exports.getUsers = function(req, res){
	//err -> error when error
	// users -> all users on succes
	User.find(function(err, users){
		if (err)
			res.send(err);

		res.json(users);
	})
}

exports.getUser = function(req, res){
	User.findById(req.params.user_id, function(err, user){
		if(err)
			res.send(err);

		res.json(user);
	})
}

exports.putUser = function(req, res) {
  // Use the Beer model to find a specific beer
  User.findById(req.params.user_id, function(err, user) {
    if (err)
      res.send(err);

    // Update the user attr
    user.name = req.body.name;

    // Save the beer and check for errors
    user.save(function(err) {
      if (err)
        res.send(err);

      res.json({message: 'User saved', user});
    });
  });
};

exports.deleteUser = function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  User.findByIdAndRemove(req.params.user_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'User removed!' });
  });
};