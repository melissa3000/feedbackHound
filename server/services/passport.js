const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// Create a new instance of the google passport strategy and point passport to it to enable google oAuth
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		}, 
		(accessToken, refreshToken, profile, done) => {
			// make sure user does not already exist by verifying google id does not match
			// existing profile id
			User.findOne({ googleId: profile.id })
				.then((existingUser) => {
					if (existingUser) {
						// profile id already exists in db
					} else {
						// make a new record and save it to the db
						new User({ googleId: profile.id }).save();
					}
			});
			
		}
	)
);