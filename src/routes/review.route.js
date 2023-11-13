import reviewController from "../controllers/review.controller.js";
import express from "express";
const router = express.Router();

router.post("/create", reviewController.created);
router.put("/update", reviewController.update);

export default router;
