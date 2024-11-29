import express from "express";
import {
  checkUserOrganization,
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
  addOrganizationMember,
  fetchAllMembers,
  userLogin,
} from "../controllers/Organization.js";

const router = express.Router();

router.post("/user/login", userLogin);
router.get("/user/check", checkUserOrganization);
router.post("/", createOrganization);
router.get("/", getAllOrganizations);
router.get("/:id", getOrganizationById);
router.put("/:id", updateOrganization);
router.delete("/:id", deleteOrganization);
router.post("/add-member", addOrganizationMember);
router.get("/get-all-members/:organization_id", fetchAllMembers);

export default router;
