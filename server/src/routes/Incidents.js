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
import {
  authenticateToken,
  authorizeUser,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateToken, authorizeUser, createIncident);
router.get("/", getAllIncidents);
router.get("/:id", authenticateToken, authorizeUser, getIncidentById);
router.put("/:id", authenticateToken, authorizeUser, updateIncident);
router.delete("/:id", authenticateToken, authorizeUser, deleteIncident);
router.post(
  "/:id/timeline",
  authenticateToken,
  authorizeUser,
  addTimelineEntry
);
router.get("/:slug/incident", getIncidentsByOrganizationSlug);

export default router;
