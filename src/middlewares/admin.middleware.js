import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import admin from "../models/user.model.js";
import adminModel from "../models/admin.model.js";

const tokenDecode = (req) => {
   try {
      const bearHeader = req.headers.authorization;
      if (bearHeader) {
         const token = bearHeader.split(" ")[1];
         return jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
      }
      return false;
   } catch (error) {
      return false;
   }
};

const auth = async (req, res, next) => {
   const token = tokenDecode(req);
   if (!token) {
      return responseHandler.unauthoriza(res);
   }
   const user = await adminModel.findById(token.data);

   if (!user) {
      return responseHandler.unauthoriza(res);
   }
   req.user = user;
   next();
};

export default {
   auth,
   tokenDecode,
};
