// require express and router here
const express = require('express');
const router = express.Router();

// require the thought controller
const {
  createThought,
  getThoughts,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../controllers/thoughtController');

// outline the Thought routes
router.route('/thoughts').get(getThoughts).post(createThought);
router.route('/thoughts/:id').put(updateThought).delete(deleteThought);
router.route('/thoughts/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;
