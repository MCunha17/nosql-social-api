const express = require('express');
const router = express.Router();
const thoughtRoutes = require('./api/thoughts');
const userRoutes = require('./api/user');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;