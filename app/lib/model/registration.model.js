import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["internship", "webinar"],
      required: true,
    },

    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "internships",
      required: function () {
        return this.type === "internship";
      },
    },

    webinar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "webinars",
      required: function () {
        return this.type === "webinar";
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.registrations ||
  mongoose.model("registrations", registrationSchema);
