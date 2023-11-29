import responseHandler from "../handlers/response.handler.js";
import vnpay from "../handlers/vnpay.js";
const createPayment = async (req, res) => {
   try {
      const { vnp_Amount, vnp_TxnRef } = req.body;
      const vnp_OrderInfo = "Thanh toan hoa don";
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

export default {
   createPayment,
   checkPayment,
};
