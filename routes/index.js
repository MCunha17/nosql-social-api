const express = require('express');

const router = express.Router();

// Import route handlers for thoughts, users, and reactions
const thoughtRoutes = require('./api/thoughts');
const userRoutes = require('./api/user');
const reactionRoutes = require('./api/reactions');

// Set up routes for thoughts, users, and reactions
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);
router.use('/reactions', reactionRoutes);

// Export the user
module.exports = router;