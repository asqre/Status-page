import express from "express";
import {
  createIncident,
  getAllIncidents,
  getIncidentById,
  updateIncident,
  deleteIncident,
  addTimelineEntry,
  getIncidentsByOrganizationSlug,
} from "../controllers/Incidents.js";

const router = express.Router();

router.post("/", createIncident);
router.get("/", getAllIncidents);
router.get("/:id", getIncidentById);
router.put("/:id", updateIncident);
router.delete("/:id", deleteIncident);
router.post("/:id/timeline", addTimelineEntry);
router.get("/:slug/incident", getIncidentsByOrganizationSlug);

export default router;
