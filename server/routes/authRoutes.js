const passport = require('passport');

// exports function with routes so it can be used in index.js
module.exports = (app) => {
// route handler to authenticate user through google oauth
// scope defines the user's permissions that we're asking to access
	app.get(
		'/auth/google', 
		passport.authenticate('google', {
			scope: ['profile', 'email']
		}),
		// if google send token error, redirect to the login page
		(err, req, res, next) => {
			if (err.name === 'TokenError') {
				res.redirect('/auth/google');
			} 
		}
	);

	// route handler to handle callback from google oauth response.
	// passport uses the user's oauth code to exchange it for the user's profie at google
	app.get(
		'/auth/google/callback', 
			passport.authenticate ('google'));
	
	// test that user authentication worked
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};