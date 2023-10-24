import { Router } from "express";
import videoController from "../controllers/video.controller.js";

const router = Router();

router.post("/created", videoController.created);
router.delete("/deleted/:id", videoController.deleted);

export default router;
