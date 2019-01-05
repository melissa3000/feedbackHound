const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	// finalize stripe charge by making post request with the token from the front end,
	// express will call requireLogin middleware function itself when someone makes this post request
	app.post('/api/stripe', requireLogin, async (req, res) => {
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id
		});

		// update the user record to reflect the credits added and save the changes to the db
		req.user.credits += 5;
		// update user model when save to db has finished, this is the user model that was returned
		// after the save request
		const user = await req.user.save();

		// send updated user response back to browser
		res.send(user);
	});
};