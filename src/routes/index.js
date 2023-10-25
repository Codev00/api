import express from "express";
import userRoute from "./user.route.js";
import adminRoute from "./admin.route.js";
import genreRoute from "./genre.route.js";
import videoRoute from "./video.route.js";
import movieRoute from "./movie.route.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/admin", adminRoute);
router.use("/genre", genreRoute);
router.use("/video", videoRoute);
router.use("/movie", movieRoute);
export default router;
