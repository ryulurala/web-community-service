const mongoose = require("mongoose");

const { Schema } = mongoose;
const messageSchema = new Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);
