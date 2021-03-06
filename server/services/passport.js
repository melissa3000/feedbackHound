const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user);
		});
});

// Create a new instance of the google passport strategy and point passport to it to enable google oAuth
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		}, 
		async (accessToken, refreshToken, profile, done) => {
			// make sure user does not already exist by verifying google id does not match
			// existing profile id
			const existingUser = await User.findOne({ googleId: profile.id })
				
			if (existingUser) {
				// profile id already exists in db
				// Call the done function to let passport know authentication is finished
				// parameters for done are (errors, userRecord)
				return done(null, existingUser);
			} 
			// make a new record and save it to the db
			const user = await new User({ googleId: profile.id }).save()
			done(null, user);
			

			
		}
	)
);