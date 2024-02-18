// mongoose and mongodb connections go here
const mongoose = require('mongoose');

// wasn't able to download MongoDB, so this is me trying to do it with MongoDB Compass (??)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB database');
});

module.exports = db;
