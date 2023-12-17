const mongoose = require("mongoose");

// Define Schemes
const PostCardSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    userId: { type: Number, required: true },
    postId: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("PostCardSchema", PostCardSchema);
