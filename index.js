const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api', routes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/thoughtsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('debug', true);

// Define the Schema and Model for the "ideas" collection
const ideaSchema = new mongoose.Schema({
  // Schema fields
});

const Idea = mongoose.model('Idea', ideaSchema, 'ideas');

// Start the API server
app.listen(PORT, () => {
  console.log(`API Server now listening on PORT ${PORT}!`);
});