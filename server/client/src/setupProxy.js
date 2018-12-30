// allows app to load localhost:5000 in dev and heroku domain in prod for /auth/google OAuth step

const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
  app.use(proxy('/auth/google', { target: 'http://localhost:5000' }))
}