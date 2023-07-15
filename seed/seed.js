const mongoose = require('mongoose');
const User = require('../models/user-model');
const Thought = require('../models/thought-model');

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
    const thoughts = await Promise.all(users.map((user, index) => {
      const thoughtTexts = ['I love life!', 'I am hungry!', 'I want a puppy!'];
      const reactions = ['Yay!', 'Me too!', 'I love this!'];

      const thought = new Thought({
        thoughtText: thoughtTexts[index],
        username: user.username,
        userId: user._id,
        reactions: [
          { reactionBody: reactions[index], username: user.username }
        ]
      });

      return thought.save();
    }));

    // Add thoughts to the corresponding users
    await Promise.all(users.map((user, index) => {
      return User.findByIdAndUpdate(user._id, { $push: { thoughts: thoughts[index]._id } }, { new: true });
    }));

    console.log('Fake data seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding fake data:', error);
    mongoose.connection.close();
  }
};

seedData();