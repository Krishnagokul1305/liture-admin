import mongoose from "mongoose";

const membershipRegistrationSchema = new mongoose.Schema(
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
    membership: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "memberships",
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.models?.membershipRegistrations ||
  mongoose.model("membershipRegistrations", membershipRegistrationSchema);
