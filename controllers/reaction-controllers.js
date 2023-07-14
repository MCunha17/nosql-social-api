const { Thought, Reaction } = require('../models');

const reactionController = {
  // Add a new reaction to a thought
  addReaction: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;

      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      const newReaction = new Reaction({ reactionBody, username });
      thought.reactions.push(newReaction);

      await Promise.all([newReaction.save(), thought.save()]);

      res.status(201).json({ message: 'Reaction added successfully', thought });
    } catch (error) {
      console.error('Error adding reaction:', error);
      res.status(500).json({ message: 'Failed to add reaction' });
    }
  },

  // Remove a reaction from a thought
  removeReaction: async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;

      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { _id: reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.status(200).json({ message: 'Reaction successfully deleted', thought });
    } catch (error) {
      console.error('Error removing reaction:', error);
      res.status(500).json({ message: 'Failed to remove reaction' });
    }
  }
};

module.exports = reactionController;