// const {Schema, model} = require('mongoose');
const { Schema, model } = require('mongoose');

// const reactionSchema = new Schema(
// reactionID, reactionBody, username, createdAt
const reactionSchema = new Schema(
  {
    reactionID: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

// module.exports = reactionSchema;
module.exports = reactionSchema;