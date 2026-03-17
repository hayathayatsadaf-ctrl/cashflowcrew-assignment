import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  comments: [
    {
      text: { type: String, required: true },
      author: { type: String, default: "Anonymous" },
      createdAt: { type: Date, default: Date.now }
    }
  ]

});

export default mongoose.model("Idea", ideaSchema);