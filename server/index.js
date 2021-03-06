const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// connect to mongoDB using mongoose
mongoose.connect(keys.mongoURI);

const app = express();

// wire up body-parser middleware so that express can read request body for 
// any post or put requests
app.use(bodyParser.json());

app.use(
	// cookie expires in 30 days and will be automatically encrypted
	cookieSession({ 
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);
app.use(passport.initialize());
app.use(passport.session());

// require function from authRoutes and call it with app to allow routes to access app and run routes
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// make sure express behaves correctly in the production environment
if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assets like main.js or main.css
	app.use(express.static('client/build'));

	// Express will serve up index.html file if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// Allow dynamic port binding for deployment to Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);
