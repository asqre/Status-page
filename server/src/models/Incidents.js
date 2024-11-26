import mongoose from "mongoose";

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
  },
  { timestamps: true }
);

export default mongoose.model("Incidents", incidentSchema);
