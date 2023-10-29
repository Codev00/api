import express from "express";
import { body } from "express-validator";
import adminController from "../controllers/admin.controller.js";
import requestHandler from "../handlers/request.handler.js";
import adminModel from "../models/admin.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

const router = express.Router();

router.post(
   "/signup",
   body("username")
      .exists()
      .withMessage("username is required")
      .isLength({ min: 6 })
      .withMessage("username minimum 6 characters")
      .custom(async (value) => {
         const user = await adminModel.findOne({ username: value });
         if (user) {
            return Promise.reject("User already exists");
         }
      }),
   body("password")
      .exists()
      .withMessage("password is required")
      .isLength({ min: 6 })
      .withMessage("password minimum 6 characters"),
   requestHandler.validate,
   adminController.signup
);

router.post(
   "/signin",
   body("username")
      .exists()
      .withMessage("username is required")
      .isLength({ min: 6 })
      .withMessage("username minimum 6 characters"),
   body("password")
      .exists()
      .withMessage("password is required")
      .isLength({ min: 6 })
      .withMessage("password minimum 6 characters"),
   requestHandler.validate,
   adminController.signin
);

router.get("/info", adminMiddleware.auth, adminController.getInfo);
export default router;
