import mongoose from "mongoose";

const webinarSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      default: null,
    },
    title: String,
    description: String,
    event_date: Date,

    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models?.webinars ||
  mongoose.model("webinars", webinarSchema);
