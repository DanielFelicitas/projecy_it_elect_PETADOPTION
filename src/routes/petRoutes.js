import express from "express";
import { asyncHandler } from "../middleware/errorHandling.js";
import { getPets, getPet, createPet, updatePet, deletePet } from "../controllers/petController.js";

const router = express.Router();

router.get("/", asyncHandler(getPets));
router.get("/:id", asyncHandler(getPet));
router.post("/", asyncHandler(createPet));
router.put("/:id", asyncHandler(updatePet));
router.delete("/:id", asyncHandler(deletePet));

export default router;
