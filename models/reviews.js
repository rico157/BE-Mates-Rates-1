const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false)

const reviewSchema = new Schema({
  body: {type: String, required: true},
  rating: {type: Number, required: true},
  restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant', required: true},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Review', reviewSchema);
