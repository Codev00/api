import express from "express";
import { body } from "express-validator";
import favoriteController from "../controllers/favorite.controller.js";
import userController from "../controllers/user.controller.js";
import userModel from "../models/user.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router();

router.post(
   "/signup",
   body("username")
      .exists()
      .withMessage("username is required")
      .isLength({ min: 6 })
      .withMessage("username minimum 6 characters")
      .custom(async (value) => {
         const user = await userModel.findOne({ username: value });
         if (user) {
            return Promise.reject("User already exists");
         }
      }),
   body("password")
      .exists()
      .withMessage("password is required")
      .isLength({ min: 6 })
      .withMessage("password minimum 6 characters"),
   body("confirmPassword")
      .exists()
      .withMessage("confirmPassword is required")
      .isLength({ min: 6 })
      .withMessage("confirmPassword minimum 6 characters")
      .custom((value, { req }) => {
         if (value !== req.body.password)
            throw new Error("confirmPassword not match");
         return true;
      }),
   requestHandler.validate,
   userController.signup
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
   userController.signin
);

router.put(
   "/update-password",
   tokenMiddleware.auth,
   body("password")
      .exists()
      .withMessage("password is required")
      .isLength({ min: 6 })
      .withMessage("password minimum 6 characters"),
   body("newPassword")
      .exists()
      .withMessage("newPassword is required")
      .isLength({ min: 6 })
      .withMessage("newPassword minimum 6 characters"),
   body("confirmNewPassword")
      .exists()
      .withMessage("confirmNewPassword is required")
      .isLength({ min: 6 })
      .withMessage("confirmNewPassword minimum 6 characters")
      .custom((value, { req }) => {
         if (value !== req.body.newPassword)
            throw new Error("confirmNewPassword not match");
         return true;
      }),
   requestHandler.validate,
   userController.updatePassword
);

router.put(
   "/reset-password",
   body("password")
      .exists()
      .withMessage("password is required")
      .isLength({ min: 6 })
      .withMessage("password minimum 6 characters"),
   body("confirmPassword")
      .exists()
      .withMessage("confirmPassword is required")
      .isLength({ min: 6 })
      .withMessage("confirmPassword minimum 6 characters")
      .custom((value, { req }) => {
         if (value !== req.body.newPassword)
            throw new Error("confirmPassword not match");
         return true;
      }),
   userController.resetPassword
);

router.post("/forgot-password", userController.forgotPassword);

router.get("/info", tokenMiddleware.auth, userController.getInfo);
router.get("/info/:id", tokenMiddleware.auth, userController.getUser);

router.post("/favorites", tokenMiddleware.auth, favoriteController.addFavorite);

router.delete(
   "/unfavorites/:id",
   tokenMiddleware.auth,
   favoriteController.removeFavorite
);

router.get("/list", requestHandler.validate, userController.listUser);
router.put(
   "/edit/:id",
   tokenMiddleware.auth,
   body("email")
      .exists()
      .custom(async (value) => {
         console.log(value);
         const user = await userModel.findOne({ email: value });
         console.log(user);
         if (user) {
            return Promise.reject("User already exists");
         }
      }),
   requestHandler.validate,
   userController.editUser
);
export default router;
