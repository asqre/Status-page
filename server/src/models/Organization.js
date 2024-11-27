import mongoose from "mongoose";
import { UserRoles } from "../data/Enums.js";

const OrganizationSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    members: [
      {
        user: {
          type: String,
          ref: "Users",
        },
        role: {
          type: String,
          enum: Object.values(UserRoles),
        },
      },
    ],
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Organization", OrganizationSchema);
