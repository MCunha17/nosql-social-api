const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/user-controllers');

// Import the thoughtController
const thoughtController = require('../../controllers/thought-controllers');

// /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(async (req, res) => {
    try {
      await deleteUser(req, res);
      await thoughtController.deleteThoughtsByUserId(req.params.id);
      res.status(200).json({ message: 'User and associated thoughts successfully deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting user and thoughts.' });
    }
  });  

// /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;