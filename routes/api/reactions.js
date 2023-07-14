const router = require('express').Router();
const {
  addReaction,
  removeReaction
} = require('../../controllers/reaction-controllers');

// POST /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// DELETE /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;