// This file will validate the sign up information
// Because we only have one type of user, we don't need to validate that
const mongoose = require('mongoose');
const User = require('./models/user');

function checkDuplicateUsername(givenUserName, result) {
  User.findOne({
    userName: givenUserName,
  }).exec((error, user) => {
    if (error) {
      result.status(500).send({ message: error });
      return false;
    }
    if (user) {
      result.status(400).send({ message: 'Username Already in use' });
      return false;
    }
    return true;
  });
}
const checkDuplicate = mongoose.model('checkDuplicateUsername', checkDuplicateUsername);
module.exports = checkDuplicate;
