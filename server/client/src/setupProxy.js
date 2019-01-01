// allows app to load localhost:5000 instead of localhost:3000 in dev for /auth/google OAuth step 
// Does not require a separate proxy for heroku and production because we'll run
// build before deploying and will not use the client server once build is complete.The client
// server doesn't exist in production

const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
  app.use(proxy('/auth/google', { target: 'http://localhost:5000' }))
}