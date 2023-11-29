import { VNPay } from "vnpay";
import "dotenv/config";
const vnp_TmnCode = "W9I3QONB";
const vnp_HashSecret = "BMGKWHEGWGWIFGINJQSUUPKWVPNNYHZG";
const vnp_Url = "http://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const customerIP = process.env.customerIP;
console.log(customerIP);

const vnpay = new VNPay({
   paymentGateway: vnp_Url,
   tmnCode: vnp_TmnCode,
   secureSecret: vnp_HashSecret,
   returnUrl: customerIP,
});

export default vnpay;
