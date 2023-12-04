import { VNPay } from "vnpay";
import "dotenv/config";
const vnp_TmnCode = process.env.vnp_TmnCode;
const vnp_HashSecret = process.env.vnp_HashSecret;
const vnp_Url = "http://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const customerIP = process.env.customerIP;

const vnpay = new VNPay({
   paymentGateway: vnp_Url,
   tmnCode: vnp_TmnCode,
   secureSecret: vnp_HashSecret,
   returnUrl: customerIP,
});

export default vnpay;
