import express from "express";
import { getAdoptions, createAdoption, updateAdoption } from "../controllers/adoptionController.js";
import { asyncHandler } from "../middleware/errorHandling.js";

const router = express.Router();

router.get("/", asyncHandler(getAdoptions));
router.post("/", asyncHandler(createAdoption));
router.put("/:id", asyncHandler(updateAdoption));

export default router;
