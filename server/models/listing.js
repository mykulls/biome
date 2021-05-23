const mongoose = require('mongoose');

const { Schema } = mongoose;

// create schema for listings
const ListingSchema = new Schema({
  address: {
    type: String,
    required: 'The address field is required',
  },
  city: {
    type: String,
    required: 'The city field is required',
  },
  state: {
    type: String,
    required: 'The state field is required',
  },
  zip: {
    type: Number,
    required: 'The zip code field is required',
  },
  description: {
    type: String,
    required: 'A description is required'
  },
},
{
  timestamps: true,
});

// create model for todo
const Listing = mongoose.model('listing', ListingSchema);

module.exports = Listing;
