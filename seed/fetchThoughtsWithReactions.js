const mongoose = require('mongoose');
const Thought = require('../models/thought-model');

// Define a function to fetch thoughts with reactions
const fetchThoughtsWithReactions = async () => {
  try {
    // Use the Thought model to find all thoughts and populate the 'reactions' field
    const thoughtsWithReactions = await Thought.find().populate('reactions');

    // Log the thoughts with reactions to the console
    console.log(thoughtsWithReactions);
  } catch (error) {
    // Handle any errors that occur during the fetching process
    console.error('Error fetching thoughts with reactions:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

// Call the fetchThoughtsWithReactions function to fetch and display the thoughts with reactions
fetchThoughtsWithReactions();