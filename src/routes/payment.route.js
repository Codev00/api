import express from "express";
import paymentController from "../controllers/payment.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

const router = express.Router();

router.post("/premium", tokenMiddleware.auth, paymentController.createPayment);
router.get("/check-payment", paymentController.checkPayment);
router.post("userPayment", paymentController.createPaymentUser);
router.get("/list", paymentController.getListPayment);

export default router;
