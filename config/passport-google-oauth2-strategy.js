const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// Telling passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: "487667506485-qa1pq9jbaoihupvi8ullc0dqvont3kgc.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },

    function(accessToken, refreshToken, profile, done) {
        // Find a User
        User.findOne({ email: profile.emails[0].value }).exec(function(err, user) {
            if (err) {
                console.log('error in google strategy-passport', err);
                return;
            }
            console.log(profile);

            if (user) {
                // If User found, set this user as req.user
                return done(null, user);
            } else {
                // If User not found... (i.e user is not present in the system), create the User and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user) {
                    if (err) {
                        console.log('error in creating User google strategy-passport', err);
                        return;
                    }
                    return done(null, user);
                });
            }
        });
    }

));

module.exports = passport;