const { User, Thought } = require('../models');

const userController = {
   
// Get all users
getAllUsers(req, res) {
    // Find all users
    User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
},

    // Get one user by id
getUserById({ params }, res) {
    // Find a user by their id
    User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
},

    // Create a user
    createUser({ body }, res) {
        // Create a new user with the provided data
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // Update user by id
    updateUser({ params, body }, res) {
        // Find a user by their id and update their information
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
        .catch(err => res.status(400).json(err));
    },

    // Delete user
    deleteUser({ params }) {
        // Find a user by their id and delete them
        return new Promise((resolve, reject) => {
            User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    reject({ status: 404, message: 'No user found with this id.' });
                    return;
                }
                resolve({ message: 'User successfully deleted.' });
            })
            .catch(err => reject({ status: 400, err }));
        });
    },

    // Add friend
    addFriend({ params }, res) {
        // Find a user by their id and add a friend to their friend list
        User.findByIdAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id.' });
            return;
            }
                res.json(dbUserData);
            })
        .catch(err => res.json(err));
    },

    // Remove friend
    removeFriend({ params }, res) {
        // Find a user by their id and remove a friend from their friend list
        User.findByIdAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = userController;