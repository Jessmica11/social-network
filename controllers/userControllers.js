// controllers/userController.js
const User = require('../models/User');

const createUser = async (req, res) => {
  // create a new user
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  // GET an array of all users
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  // update a user by their _id
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  // delete a user by a user's _id
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    // hopefully this will delete all thoughts associated with the user
    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addFriend = async (req, res) => {
  // add a "new friend" to a user's friend list
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $push: { friends: req.params.friendId } },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const removeFriend = async (req, res) => {
  // a function for removing a friend by a user's friendId
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// call all the controller functions
module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};
