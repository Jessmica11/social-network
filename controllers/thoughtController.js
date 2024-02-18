// connect to the Thought model
const Thought = require('../models/Thought');

// the controller functions we will use for the app
const createThought = async (req, res) => {
  // function to create a new thought
  try {
    const { thoughtText, username, userId } = req.body;

    // is there a userId in the request body?
    if (!userId) {
      return res.status(400).json({ error: 'userId is required in the request body' });
    }

    // a thought is made up of thoughtText, the username of the user who created the thought, and the userId of the user who created the thought
    const thought = await Thought.create({
      thoughtText,
      username,
      // associate the thought with the user who created it (by userId)
      user: userId,
    });

    // then PUSH the created thought's _id to the associated user's thoughts array field
    await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    res.status(201).json(thought);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getThoughts = async (req, res) => {
  // GET an array of all thoughts
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateThought = async (req, res) => {
  // update a thought by its _id
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteThought = async (req, res) => {
  // delete a thought by its _id
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createReaction = async (req, res) => {
  // create a reaction stored in a single thought's reactions array field
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    );
    res.status(201).json(thought);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteReaction = async (req, res) => {
  // delete a reaction by its id
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    res.status(200).json(thought);
  } catch (error) {
    res.status(500).json(error);
  }
};

// call the controller functions
module.exports = {
  createThought,
  getThoughts,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
};
