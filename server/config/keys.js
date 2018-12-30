// if we're in production (running on Heroku), return prod keys otherwise use dev keys
if (process.env.NODE_ENV === 'production') {
	module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}