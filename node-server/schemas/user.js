const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  nickname: {
    type: String,
    require: false,
    unique: true, // for. message
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
  cretedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
