import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";

const tokenDecode = (req) => {
   try {
      const bearHeader = req.header["authorization"];
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
   const tokenDecode = tokenDecode(req);
   if (!tokenDecode) {
      return responseHandler.unauthoriza(res);
   }
   const user = await userModel.findById(tokenDecode.data);
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
