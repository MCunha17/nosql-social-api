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
const { deleteThoughtsByUserId } = require('../../controllers/thought-controllers');

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
  .delete((req, res) => {
    deleteUser(req, res);
    deleteThoughtsByUserId(req.params.id);
  });

// /api/users/:userId/friends/:friendId
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;