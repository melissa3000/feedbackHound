const express = require('express');
const app = express();

// Route handler
app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

// Allow dynamic port binding for deployment to Heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);