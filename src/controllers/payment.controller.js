import responseHandler from "../handlers/response.handler.js";
import vnpay from "../handlers/vnpay.js";
import paymentModel from "../models/payment.model.js";
const createPayment = async (req, res) => {
   try {
      const { vnp_Amount, vnp_TxnRef } = req.body;
      const vnp_OrderInfo = "Thanh toan hoa don Premium";
      const paymentUrl = await vnpay.buildPaymentUrl({
         vnp_Amount: vnp_Amount,
         vnp_TxnRef: vnp_TxnRef,
         vnp_OrderInfo: vnp_OrderInfo,
         vnp_IpAddr: "127.0.0.1",
      });
      console.log(paymentUrl);
      responseHandler.ok(res, { paymentUrl });
   } catch (error) {
      console.log(error.message);
      responseHandler.error(res);
   }
};
const checkPayment = async (req, res) => {
   try {
      const verifyResult = await vnpay.verifyReturnUrl(req.query);
      responseHandler.ok(res, verifyResult);
   } catch (error) {
      console.log(error);
      responseHandler.error(res);
   }
};

const createPaymentUser = async (req, res) => {
   try {
      const { amount, userId } = req.body;
      const payment = await paymentModel.create({
         amount,
         userId,
      });
      payment.save();
   } catch (error) {
      console.log(error);
      responseHandler.error(res);
   }
};

const getListPayment = async (req, res) => {
   try {
      const payments = await paymentModel.find({}).populate(["userId"]);
      responseHandler.ok(res, payments);
   } catch (error) {
      console.log(error);
      responseHandler.error(res);
   }
};

export default {
   createPayment,
   checkPayment,
   createPaymentUser,
   getListPayment,
};
