// This file will validate the sign up information
// Because we only have one type of user, we don't need to validate that
const database = require('./models');

const User = database.user;
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
module.export = checkDuplicateUsername;
