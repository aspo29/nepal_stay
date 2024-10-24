const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true // Ensure unique usernames
  },
  // chats: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Chat",
  //   require: true,
  // }]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);