const mongoose = require('mongoose');
const User = require('./user');

const { Schema } = mongoose;
const CommentSchema = new Schema({
  text: {
    type: String,
    required: 'The address field is required',
  },
  user: {
    type: User,
    required: 'The address field is required',
  },
  likes: {
    type: Number,
  },
},
{
  timestamps: true,
});

// create model for todo
const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
