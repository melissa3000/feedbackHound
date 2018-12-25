const express = require('express');
require('./services/passport');

const app = express();

// require function from authRoutes and call it with app to allow routes to access app and run routes
require('./routes/authRoutes')(app);

// Allow dynamic port binding for deployment to Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);
