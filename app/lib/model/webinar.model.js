import mongoose from "mongoose";

const webinarSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    eventDate: Date,

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Webinar ||
  mongoose.model("Webinar", webinarSchema);
