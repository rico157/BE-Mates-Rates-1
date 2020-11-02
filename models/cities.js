const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citiesSchema = new Schema({
  name: String
});

module.exports = mongoose.model('City', citiesSchema);
