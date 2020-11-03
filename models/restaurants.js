const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

const restaurantsSchema = new Schema({
  name: {type: String, required: true},
  cuisine: {type: String, required: true},
  img: { type: String, required: false},
  city_id: {type: Schema.Types.ObjectId, ref: 'City', required: true}
});


module.exports = mongoose.model('Restaurant', restaurantsSchema);
