import express from "express";
import genreController from "../controllers/genre.controller.js";

const router = express.Router();

router.post("/created", genreController.created);
router.get("/list", genreController.getList);
router.put("/edited/:id", genreController.edited);
router.delete("/delete/:id", genreController.deleted);

export default router;
