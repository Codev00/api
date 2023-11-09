import { Router } from "express";
import movieController from "../controllers/movie.controller.js";

const router = Router();

router.post("/created", movieController.created);
router.get("/list", movieController.getAllMovies);
router.get("/get/:id", movieController.getMovie);
router.put("/edited/:id", movieController.edited);
router.delete("/deleted/:id", movieController.deleted);
router.get("/search", movieController.searchMovie);
router.get("/search/genre", movieController.searchMovieGenre);
router.put("/censorship/:id", movieController.changeCensorship);
router.get("/censorship", movieController.listCensorship);

export default router;
