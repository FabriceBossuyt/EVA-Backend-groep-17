// BASE SETUP
// call the packages we need
var express = require('express');
var morgan = require('morgan')
var favicon = require('serve-favicon');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var router = express.Router();
var port = process.env.PORT || 8080;  //setup Port
var session = require('express-session');
var cors = require('cors')

// Controllers
var gebruikerController = require('./controllers/gebruiker.js');
var challengeController = require('./controllers/challenge.js');
var receptController = require('./controllers/recept.js');
var oauth2Controller = require('./middleware/oauth2.js')

var Gebruiker = require('./models/gebruiker.js');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());

require('./middleware/auth.js')

//Connect to database
mongoose.connect('mongodb://95.85.63.6:27017/EVA', function (err) {
    if (err)
        console.error(err);
});

// ROUTES
app.use('/api', router);


router.route('/gebruikers')
	.post(gebruikerController.postGebruikers)
	.get(gebruikerController.getGebruikers);

router.route('/gebruikers/:gebruiker_id')
	.get(gebruikerController.getGebruiker)
	.put(gebruikerController.putGebruiker)
	.delete(gebruikerController.deleteGebruiker);

router.route('/gebruikerByFacebookId/:facebookId')
	.get(gebruikerController.getGebruikerByFacebookId);

router.route('/gebruikerByUsername/:username')
	.get(gebruikerController.getGebruikerByUsername);

router.route('/updateGebruikerByFacebookId/:facebookId')
	.put(gebruikerController.updateGebruikerByFacebookId);

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

router.route('/me')
    .put(passport.authenticate('bearer', {session: false}), function(req,res){
        gebruikerController.putGebruiker(req, res)
    })

app.post('/api/oauth/token', oauth2Controller.token)

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }));

app.get('/api/userInfo',
    passport.authenticate('bearer', { session: false }),
        function (req, res) {
            // req.authInfo is set using the `info` argument supplied by
            // `BearerStrategy`.  It is typically used to indicate a scope of the token,
            // and used in access control checks.  For illustrative purposes, this
            // example simply returns the scope in the response.
            res.json({ data: req.user })

        }
);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port 8080');
