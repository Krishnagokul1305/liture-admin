import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
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

export default mongoose.models?.internships ||
  mongoose.model("internships", internshipSchema);
