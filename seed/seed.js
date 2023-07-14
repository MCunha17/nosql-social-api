const mongoose = require('mongoose');
const { User, Thought, Reaction } = require('../models');

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
      { thoughtText: 'I love life!', username: users[0].username, userId: users[0]._id },
      { thoughtText: 'I am hungry!', username: users[1].username, userId: users[1]._id },
      { thoughtText: 'I want a puppy!', username: users[2].username, userId: users[2]._id },
    ]);

    // Reactions
    const reactions = await Reaction.insertMany([
      { reactionBody: 'Yay!', username: users[0].username },
      { reactionBody: 'Me too!', username: users[1].username },
      { reactionBody: 'I love this!', username: users[2].username },
    ]);

    // Associate thoughts with reactions
    thoughts[0].reactions.push(reactions[0]._id);
    thoughts[1].reactions.push(reactions[1]._id);
    thoughts[2].reactions.push(reactions[2]._id);

    // Save the updated thoughts with reactions
    await Promise.all(thoughts.map((thought) => thought.save()));

    console.log('Fake data seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding fake data:', error);
    mongoose.connection.close();
  }
};

seedData();