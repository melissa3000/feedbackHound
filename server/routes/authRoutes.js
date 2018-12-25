const passport = require('passport');

// exports function with routes so it can be used in index.js
module.exports = (app) => {
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
};