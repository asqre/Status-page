import express from "express";
import {
  checkUserOrganization,
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} from "../controllers/Organization.js";

const router = express.Router();

router.get("/check/:userId", checkUserOrganization);
router.post("/", createOrganization);
router.get("/", getAllOrganizations);
router.get("/:id", getOrganizationById);
router.put("/:id", updateOrganization);
router.delete("/:id", deleteOrganization);

export default router;
