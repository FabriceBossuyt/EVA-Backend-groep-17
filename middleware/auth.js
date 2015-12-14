var passport                = require('passport');
var BasicStrategy           = require('passport-http').BasicStrategy;
var ClientPasswordStrategy  = require('passport-oauth2-client-password').Strategy;
var BearerStrategy          = require('passport-http-bearer').Strategy;
var FacebookStrategy        = require('passport-facebook').Strategy;
var FacebookTokenStrategy   = require('passport-facebook-token').Strategy;
var ClientModel             = require('../models/client')
var UserModel               = require('../models/gebruiker');
var AccessTokenModel        = require('../models/accesstoken');
var RefreshTokenModel       = require('../models/refreshtoken');

passport.use(new BasicStrategy(
    function (username, password, done) {
        ClientModel.findOne({ clientId: username }, function (err, client) {
            if (err) {
                return done(err);
            }
            if (!client) {
                return done(null, false);
            }
            if (client.clientSecret != password) {
                return done(null, false);
            }

            return done(null, client);
        });
    }
));

passport.use(new ClientPasswordStrategy(
    function (clientId, clientSecret, done) {
        ClientModel.findOne({ clientId: clientId }, function (err, client) {
            if (err) {
                return done(err);
            }
            if (!client) {
                return done(null, false);
            }
            if (client.clientSecret != clientSecret) {
                return done(null, false);
            }

            return done(null, client);
        });
    }
));

passport.use(new FacebookStrategy(
    {
        clientID: "1519833821647286",
        clientSecret: "898a90b43a1954286c0ceeb0b9eede08",
        callbackURL: "http://localhost:8080/auth/facebook/callback",
        profileFields: ['id', 'emails', 'name'],
    },
    function (accessToken, refreshToken, profile, done) {
        UserModel.findOrCreate({ facebookId: profile.id }, function (err, user) {
            if (err) {
                return done(err);
            }

            return done(err, user);
        });
    }
));

passport.use(new BearerStrategy(
    function (accessToken, done) {
        AccessTokenModel.findOne({ token: accessToken }, function (err, token) {
            if (err) {
                return done(err);
            }
            if (!token) {
                return done(null, false);
            }

            UserModel.findById(token.userId, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'Unknown user' });
                }

                var info = { scope: '*' }
                done(null, user, info);
            });
        });
    }
));

