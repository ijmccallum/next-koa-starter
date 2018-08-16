const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  created: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);

export default User;
