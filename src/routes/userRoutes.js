import express from "express";
import { getUsers, createUser, getUserAdoptions } from "../controllers/userController.js";
import { asyncHandler } from "../middleware/errorHandling.js";
const router = express.Router();

router.get("/", asyncHandler(getUsers));
router.post("/", asyncHandler(createUser));
router.get("/:id/adoptions", asyncHandler(getUserAdoptions));

export default router;
