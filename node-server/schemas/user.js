const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
    require: true, // only local-strategy
    unique: true,
  },
  nickname: {
    type: String,
    require: true, // for. message
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
