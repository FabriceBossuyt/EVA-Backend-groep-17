// BASE SETUP
// call the packages we need
var express    = require('express');        
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var app        = express();                 
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();             
var port = process.env.PORT || 8080;  //setup Port

// Controllers
var userController = require('./controllers/user.js');
var challengeController = require('./controllers/challenge.js');
var receptController = require('./controllers/recept.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Connect to database
//mongoose.connect('mongodb://188.226.217.99:20717');

// ROUTES
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// all of our routes will be prefixed with /api
app.use('/api', router);

router.route('/users')
	.post(userController.postUsers)
	.get(userController.getUsers);

router.route('/users/:user_id')
	.get(userController.getUser)
	.put(userController.putUser)
	.delete(userController.deleteUser);


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);