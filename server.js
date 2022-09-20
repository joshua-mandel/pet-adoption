const debug = require('debug')('app:server');
const debugError = require('debug')('app:error');
const express = require('express');

// construct express app
const app = express();
// body parsers
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// define routes
app.use('/api/pet', require('./routes/api/pet'));

// handle errors
app.use((req, res, next) => {
  res.status(404).json({ error: "Page not found."});
});
app.use((err, req, res, next) => {
  debugError(err);
  res.status(500).json({ error: err.message });
});

// start listening for requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
  debug(`Server running at http://localhost:${port}`);
});
