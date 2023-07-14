const { Thought, Reaction } = require('../models');

const reactionController = {
  // Add a new reaction to a thought
  addReaction: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;

      // Find the thought by its id
      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        // If no thought is found, return error
        return res.status(404).json({ message: 'Thought not found.' });
      }

      // Create a new reaction with the provided data
      const newReaction = new Reaction({ reactionBody, username });
      thought.reactions.push(newReaction);

      // Save the new reaction and the updated thought
      await Promise.all([newReaction.save(), thought.save()]);

      // Return a success response
      res.status(201).json({ message: 'Reaction successfully added.', thought });
    } catch (error) {
      // Handle any errors
      console.error('Error adding reaction.', error);
      res.status(500).json({ message: 'Unable to add reaction.' });
    }
  },

  // Remove a reaction from a thought
  removeReaction: async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;

      // Find the thought by its id and remove the specified reaction from its reactions array
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { _id: reactionId } } },
        { new: true }
      );

      if (!thought) {
        // If no thought is found, return error
        return res.status(404).json({ message: 'Thought not found' });
      }

      // Return a success response with the message
      res.status(200).json({ message: 'Reaction successfully deleted', thought });
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error removing reaction:', error);
      res.status(500).json({ message: 'Failed to remove reaction' });
    }
  }
};

module.exports = reactionController;