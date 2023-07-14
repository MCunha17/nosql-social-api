const mongoose = require('mongoose');
const { User, Thought } = require('../models');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/thoughtsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to seed fake data
const seedData = async () => {
  try {
    // Users
    const users = await User.insertMany([
      { username: 'mcunha1', email: 'maria.cunha1@example.com' },
      { username: 'awright', email: 'alex.wright@example.com' },
      { username: 'cwilson', email: 'cj.wilson@example.com' },
    ]);

    // Thoughts
    const thoughts = await Thought.insertMany([
      { 
        thoughtText: 'I love life!', 
        username: users[0].username, 
        userId: users[0]._id, 
        reactions: [
          { reactionBody: 'Yay!', username: users[0].username }
        ]
      },
      { 
        thoughtText: 'I am hungry!', 
        username: users[1].username, 
        userId: users[1]._id,
        reactions: [
          { reactionBody: 'Me too!', username: users[1].username }
        ] 
      },
      { 
        thoughtText: 'I want a puppy!', 
        username: users[2].username, 
        userId: users[2]._id,
        reactions: [
          { reactionBody: 'I love this!', username: users[2].username }
        ] 
      },
    ]);

    console.log('Fake data seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding fake data:', error);
    mongoose.connection.close();
  }
};

seedData();