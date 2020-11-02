const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  avatarURL: String,
  friend_id: String
});

module.exports = mongoose.model('User', userSchema);
