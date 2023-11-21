import reviewController from "../controllers/review.controller.js";
import express from "express";
import tokenMiddleware from "../middlewares/token.middleware.js";
const router = express.Router();

router.post("/create", reviewController.created);
router.put("/update/:id", tokenMiddleware.auth, reviewController.updated);
router.put("/delete/:id", tokenMiddleware.auth, reviewController.deleted);

export default router;
