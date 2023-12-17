const mongoose = require("mongoose");

// Define Schemes
const PostSchema = new mongoose.Schema(
  {
    userId: { type: Number, required: true },
    thumbnail: { type: String, required: false },
    title: { type: String, required: true },
    views: { type: Number, required: true, default: 0 },
    content: { type: String, required: true },
    deskInfo: { type: Object, required: true },
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("PostSchema", PostSchema);
