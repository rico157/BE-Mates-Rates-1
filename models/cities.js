const mongoose = require('mongoose');
const { Schema } = mongoose;

const citiesSchema = new Schema({
  name: { type: String, required: true},
  restaurants: [{type: Schema.Types.ObjectId, ref: 'restaurants'}]
});

module.exports = mongoose.model('City', citiesSchema);
