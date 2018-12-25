const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

// Create a new instance of the google passport strategy and point passport to it to enable google oAuth
passport.use(
  new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		}, 
		(accessToken, refreshToken, profile, done) => {
			console.log('access token', accessToken);
			console.log('refresh token', refreshToken);
			console.log('profile:', profile);
		}
	)
);

// route handler to authenticate user through google oauth
// scope defines the user's permissions that we're asking to access
app.get(
	'/auth/google', 
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);

// route handler to handle callback from google oauth response.
// passport uses the user's oauth code to exchange it for the user's profie at google
app.get(
	'/auth/google/callback', 
	passport.authenticate ('google'));

// Allow dynamic port binding for deployment to Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);
