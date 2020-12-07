const mongoose = require("mongoose");

const { Schema } = mongoose;

const boardSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const gallerySchema = new Schema({
  content: {
    // Image
    type: String,
    require: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

exports.Board = mongoose.model("Board", boardSchema);
exports.Gallery = mongoose.model("Gallery", gallerySchema);
