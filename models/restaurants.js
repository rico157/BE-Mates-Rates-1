const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantsSchema = new Schema({
  name: String,
  cuisine: String,
  city_id: String
});

module.exports = mongoose.model('Restaurant', restaurantsSchema);
