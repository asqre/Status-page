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
  userSignup,
} from "../controllers/Organization.js";
import {
  authenticateToken,
  authorizeUser,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/user/login", userLogin);
router.post("/user/signup", userSignup);
router.get("/user/check", checkUserOrganization);
router.post("/", createOrganization);

// Protected routes
router.get("/", getAllOrganizations);
router.get("/:id", authenticateToken, authorizeUser, getOrganizationById);
router.put("/:id", authenticateToken, authorizeUser, updateOrganization);
router.delete("/:id", authenticateToken, authorizeUser, deleteOrganization);
router.post(
  "/add-member",
  authenticateToken,
  authorizeUser,
  addOrganizationMember
);
router.get("/get-all-members/:organization_id", fetchAllMembers);

export default router;
