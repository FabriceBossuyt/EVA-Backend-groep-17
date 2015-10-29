// BASE SETUP
// call the packages we need
var express    		= require('express'); 
var morgan 			= require('morgan')      
var favicon 		= require('serve-favicon');
var app        		= express();                 
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');
var mongoose   		= require('mongoose');
var passport 		= require('passport');
var router 			= express.Router();             
var port 			= process.env.PORT || 8080;  //setup Port
var session 		= require('express-session');

// Controllers
var gebruikerController = require('./controllers/gebruiker.js');
var challengeController = require('./controllers/challenge.js');
var receptController 	= require('./controllers/recept.js');
var facebookController 	= require('./controllers/facebook.js');
var oauth2Controller	= require('./controllers/oauth2.js')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

require('./controllers/auth.js')

//Connect to database
mongoose.connect('mongodb://95.85.63.6:27017/EVA');

// ROUTES
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// all of our routes will be prefixed with /api
app.use('/api', router);

//add authController.isAuthenticated if authentication 
//is required for the endpoint
router.route('/gebruikers')
	.post(gebruikerController.postGebruikers)
	.get(gebruikerController.getGebruikers);

router.route('/facebook')
	.post(facebookController.postFacebook);

router.route('/google')
	.post()

router.route('/local')
	.post()

router.route('/gebruikers/:gebruiker_id')
	.get(gebruikerController.getGebruiker)
	.put(gebruikerController.putGebruiker)
	.delete(gebruikerController.deleteGebruiker);

router.route('/Challenge')
	.post(challengeController.postChallenges)
	.get(challengeController.getChallenges);

router.route('/Challenge/:challenge_id')
	.get(challengeController.getChallenge)
	.put(challengeController.putChallenge)
	.delete(challengeController.deleteChallenge);

router.route('/Recept')
	.post(receptController.postRecepts)
	.get(receptController.getRecepts);

router.route('/Recept/:recept_id')
	.get(receptController.getRecept)
	.put(receptController.putRecept)
	.delete(receptController.deleteRecept);

app.post('/oauth/token', oauth2Controller.token);

app.get('/api/userInfo',
    passport.authenticate('bearer', { session: false }),
        function(req, res) {
            // req.authInfo is set using the `info` argument supplied by
            // `BearerStrategy`.  It is typically used to indicate a scope of the token,
            // and used in access control checks.  For illustrative purposes, this
            // example simply returns the scope in the response.
            res.json({ user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope })
        }
);

console.log(app._router.stack)

// START THE SERVER
// =============================================================================
app.listen(port);
