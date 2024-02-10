// require express, db, and routes
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// PORT is set to the environment variable PORT or 3001
const PORT = process.env.PORT || 3001;
const app = express();


// app is set to express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


// db.once('open', () => {}) is a callback function that listens for the database to open and then starts the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});