// require express and routesr here
const express = require('express');
const router = express.Router();

// require the user controller
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../controllers/userController');


// outline User routes
router.route('/users').get(getUsers).post(createUser);
router.route('/users/:id').put(updateUser).delete(deleteUser);
router.route('/users/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
