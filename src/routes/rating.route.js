import ratingController from "../controllers/rating.controller.js";
import express from "express";
const router = express.Router();

router.post("/created", ratingController.created);


export default router;
