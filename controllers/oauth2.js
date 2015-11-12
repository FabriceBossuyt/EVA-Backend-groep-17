var oauth2orize         = require('oauth2orize');
var oauth2orizeFacebook = require('oauth2orize-facebook');
var passport            = require('passport');
var crypto              = require('crypto');
var UserModel           = require('../models/gebruiker');
var AccessTokenModel    = require('../models/accesstoken');
var RefreshTokenModel   = require('../models/refreshtoken');

var server = oauth2orize.createServer();

server.exchange(oauth2orize.exchange.password(function (client, username, password, scope, done) {
    UserModel.findOne({ username: username }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        if (!user.checkPassword(password)) {
            return done(null, false);
        }

        RefreshTokenModel.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
            if (err) {
                return done(err);
            }
        });
        AccessTokenModel.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
            if (err) {
                return done(err);
            }
        });

        var tokenValue = crypto.randomBytes(32).toString('hex');
        var refreshTokenValue = crypto.randomBytes(32).toString('hex');
        var token = new AccessTokenModel({
            token: tokenValue,
            clientId: client.clientId,
            userId: user.userId
        });
        var refreshToken = new RefreshTokenModel({
            token: refreshTokenValue,
            clientId: client.clientId,
            userId: user.userId
        });

        refreshToken.save(function (err) {
            if (err) {
                return done(err);
            }
        });
        var info = { scope: '*' }
        token.save(function (err, token) {
            if (err) {
                return done(err);
            }
            done(null, tokenValue, refreshTokenValue, { 'expires_in': 3600 });
        });
    });
}));

server.exchange(oauth2orizeFacebook(function (client, profile, scope, cb) {
    UserModel.findOrCreate({ facebookId: profile.id }, function (err, user) {
        if (err) {
            return cb(err);
        }
        if (!user) {
            return cb(null, false);
        }

        RefreshTokenModel.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
            if (err) {
                return cb(err);
            }
        });
        AccessTokenModel.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
            if (err) {
                return cb(err);
            }
        });

        var tokenValue = crypto.randomBytes(32).toString('hex');
        var refreshTokenValue = crypto.randomBytes(32).toString('hex');
        var token = new AccessTokenModel({
            token: tokenValue,
            clientId: client.clientId,
            userId: user.userId
        });
        var refreshToken = new RefreshTokenModel({
            token: refreshTokenValue,
            clientId: client.clientId,
            userId: user.userId
        });

        refreshToken.save(function (err) {
            if (err) {
                return cb(err);
            }
        });
        var info = { scope: '*' }
        token.save(function (err, token) {
            if (err) {
                return cb(err);
            }
            cb(null, tokenValue, refreshTokenValue, { 'expires_in': 3600 });
        });
    });
}));

server.exchange(oauth2orize.exchange.refreshToken(function (client, refreshToken, scope, done) {
    console.log(refreshToken)
    RefreshTokenModel.findOne({ token: refreshToken }, function (err, token) {
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
                return done(null, false);
            }

            RefreshTokenModel.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
                if (err) {
                    return done(err);
                }
            });
            AccessTokenModel.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
                if (err) {
                    return done(err);
                }
            });

            var tokenValue = crypto.randomBytes(32).toString('hex');
            var refreshTokenValue = crypto.randomBytes(32).toString('hex');
            var token = new AccessTokenModel({
                token: tokenValue,
                clientId: client.clientId,
                userId: user.userId
            });

            var refreshToken = new RefreshTokenModel({
                token: refreshTokenValue,
                clientId: client.clientId,
                userId: user.userId
            });
            refreshToken.save(function (err) {
                if (err) {
                    return done(err);
                }
            });
            var info = { scope: '*' }
            token.save(function (err, token) {
                if (err) {
                    return done(err);
                }
                cb(null, tokenValue, refreshTokenValue, { 'expires_in': 3600 });
            });
        });
    });
}));

exports.token = [
	passport.authenticate(['basic', 'oauth2-client-password', 'facebook'], { session: false }),
	server.token(),
	server.errorHandler()
]