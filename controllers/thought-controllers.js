const { Thought, User } = require('../models');

const thoughtController = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then(dbThoughtData => {
        // If no Thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id.' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Create a thought
  createThought: async ({ body }, res) => {
    try {
      const thought = await Thought.create(body);
      const user = await User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
  
      if (!user) {
        res.status(404).json({ message: 'No user found with this id.' });
        return;
      }

      const populatedUser = await User.populate(user, { path: 'thoughts' });
  
      res.json(populatedUser);
    } catch (err) {
      res.json(err);
    }
  },

  // Update thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id.' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // Delete Thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id.' });
          return;
        }
        res.json({ message: 'Thought successfully deleted.' });
      })
      .catch(err => res.json(err));
  },

  // Delete all thoughts associated with a user
  deleteThoughtsByUserId(userId) {
    return Thought.deleteMany({ userId: userId });
  },

  // Add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id.' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
  },

  // Remove reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No Thought found with this id.' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
  }
};

module.exports = thoughtController;