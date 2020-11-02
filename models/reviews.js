const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  body: String,
  rating: Number,
  restaurant_id: String,
  user_id: String
});

module.exports = mongoose.model('Review', reviewSchema);
