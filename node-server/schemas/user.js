const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  // name: {
  //   type: String,
  //   require: true,
  //   unique: true,
  // },
  // age: {
  //   type: Number,
  //   required: true,
  // },
  // married: {
  //   type: Boolean,
  //   required: true,
  // },
  // comment: String,
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  nick: {
    type: String,
    require: false,
  },
  password: {
    type: String,
    require: true,
  },
  provider: {
    type: String,
    rerquire: false,
    default: "local",
  },
  snsId: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("User", userSchema);
