const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

const userSchema = new Schema({
  name: {type: String, required: true},
  username: { type: String, required: true},
  avatarURL: { type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);
