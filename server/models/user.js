// This is the model of the basic user, who can have multiple roles such as a moderator
// Here is where we decide all that a user can have
// For now we decide to only have one type of user
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  _id: {
    type: String,
    required: 'ID required',
  },
  email: {
    type: String,
    required: 'Email required',
  },
  firstName: {
    type: String,
    required: 'First name required',
  },
  lastName: {
    type: String,
    required: 'Last name required',
  },
  posts: { type: Array },
  comments: { type: Array },
  savedPosts: { type: Array },
});
const User = mongoose.model('user', UserSchema);

module.exports = User;
