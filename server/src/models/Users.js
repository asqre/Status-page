import mongoose from "mongoose";
import { UserRoles } from "../data/Enums.js";

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, trim: true },
    userEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      // required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRoles),
      default: UserRoles.MEMBER,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Users", userSchema);
