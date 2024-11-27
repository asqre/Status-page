import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: {
      type: String,
      default: "Unknown",
      enum: [
        "Operational",
        "Performance Issues",
        "Partial Outage",
        "Major Outage",
        "Unknown",
      ],
    },
    organization_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organizations",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Services", serviceSchema);
