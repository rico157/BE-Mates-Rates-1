const mongoose = require('mongoose');
const { Schema } = mongoose;

const citiesSchema = new Schema({
  name: String
});

module.exports = mongoose.model('City', citiesSchema);
