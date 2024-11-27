import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  getServicesByOrganizationSlug,
} from "../controllers/Services.js";

const router = express.Router();

router.post("/", createService);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.put("/:id", updateService);
router.delete("/:id", deleteService);
router.get('/:slug/service', getServicesByOrganizationSlug);

export default router;
