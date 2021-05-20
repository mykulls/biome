// eslint-disable-next-line max-len
// This is for the different types of users of the website that can access different data (regular users, moderators, etc.)
const mongoose = require('mongoose');

const Role = mongoose.model('Role',
  new mongoose.Schema({
    type: String, // this holding the type of user
  }));
module.exports = Role;
