import { Router } from "express";
import movieController from "../controllers/movie.controller.js";

const router = Router();

router.post("/created", movieController.created);
router.get("/movie/list", movieController.getAllMovies);
router.get("/movie/:id", movieController.getMovie);
router.put("/edited", movieController.edited);
router.delete("/deleted/:id", movieController.deleted);
router.get("/movie/search", movieController.searchMovie);

export default router;
