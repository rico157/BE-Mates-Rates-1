const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  avatarURL: String,
  friends: [String],
  wishlist: [String],
  username: String,
});

module.exports = mongoose.model("User", userSchema);
