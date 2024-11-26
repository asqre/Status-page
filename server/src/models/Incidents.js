import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Reported", "Investigating", "Identified", "Watching", "Fixed"],
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const incidentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      default: "Reported",
      enum: ["Reported", "Investigating", "Identified", "Watching", "Fixed"],
    },
    tenant_id: {
      type: Number,
      required: true,
      index: true,
    },
    timeline: [timelineSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Incidents", incidentSchema);
