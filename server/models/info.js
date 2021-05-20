// Will use this file to transfer the data about the users to other files
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const database = {};

database.mongoose = mongoose;

database.user = require('./user');
database.role = require('./role');

database.ROLES = ['regUser'];

module.exports = database;
