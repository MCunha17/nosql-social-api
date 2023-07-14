const express = require('express');
const router = express.Router();
const thoughtRoutes = require('./api/thoughts');
const userRoutes = require('./api/user');
const reactionRoutes = require('./api/reactions');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);
router.use('/reactions', reactionRoutes);

module.exports = router;