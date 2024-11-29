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
    organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizations",
      // required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Users", userSchema);
