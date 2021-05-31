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
  distance: {
    type: Number,
    required: 'The distance field is required',
  },
  school: {
    type: String,
    required: 'The school field is required',
  },
  kitchen: {
    type: Boolean,
    default: false,
  },
  laundry: {
    type: Boolean,
    default: false,
  },
  parking: {
    type: Boolean,
    default: false,
  },
  rent: {
    type: Number,
    required: 'The rent field is required',
  },
  people: {
    type: Number,
    required: 'The number of people is required',
  },
  bedrooms: {
    type: Number,
    required: 'The number of bedrooms is required',
  },
  bathrooms: {
    type: Number,
    required: 'The number of bathrooms is required',
  },
  description: {
    type: String,
    required: 'A description is required',
  },
  comments: { type: Array },
  user: { type: String },
},
{
  timestamps: true,
});

// create model for todo
const Listing = mongoose.model('listing', ListingSchema);

module.exports = Listing;
