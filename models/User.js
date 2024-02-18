// const {Schema, model} = require('mongoose');
// const userSchema = new Schema(
const User = mongoose.model('User', userSchema);
const { Schema, model } = require('mongoose');

// username, email, thoughts, friends
const userSchema = new Schema(
    {
        username: { 
            type: String, 
            unique: true, 
            required: true, 
            trim: true 
        },
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
        },
        thoughts: [
            { type: Schema.Types.ObjectId, 
                ref: 'Thought' 
            }
        ],
        friends: [
            { type: Schema.Types.ObjectId, 
                ref: 'User' 
            }
        ],
});


// Create a virtual called friendCount that retrieves the length of 
// the user's friends array field on query.
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});


// module.exports = user;
module.exports = model('User', userSchema);