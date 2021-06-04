const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose;

const UserSchema = new Schema({
  _id: {
    type: ObjectId,
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
  phoneNumber: {
    type: String,
    required: 'Phone number required',
  },
  posts: { type: Array },
  savedPosts: { type: Array },
});
const User = mongoose.model('user', UserSchema);

module.exports = User;
