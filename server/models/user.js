// This is the model of the basic user, who can have multiple roles such as a moderator
// Here is where we decide all that a user can have
// For now we decide to only have one type of user
const mongoose = require('mongoose');

const User = mongoose.model('User',
  new mongoose.Schema({
    username: String,
    password: String,
    posts: Array,
    comments: Array,
    savedPosts: Array,
  }));
module.exports = User;
