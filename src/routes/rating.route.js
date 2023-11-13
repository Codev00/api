import ratingController from "../controllers/rating.controller.js";
import express from "express";
const router = express.Router();

router.post("/create", ratingController.created);
router.put("/update", ratingController.update);

export default router;
