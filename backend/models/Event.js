// ===== backend/models/Event.js =====
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  poster: String,
  description: String,
  date: String,
  createdBy: String,
  comments: [
    {
      user: String,
      text: String,
      replies: [
        {
          admin: String,
          text: String,
        },
      ],
    },
  ],
  gallery: [String],
});

export default mongoose.model("Event", eventSchema);
