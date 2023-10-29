import adminModel from "../models/admin.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

const signup = async (req, res) => {
   try {
      const { username, password } = req.body;

      const checkUser = await adminModel.findOne({ username });

      if (checkUser) {
         return responseHandler.badrequest(res, "User already exists");
      }
      const user = new adminModel();
      user.username = username;
      user.password = bcrypt.hashSync(password, saltRounds);
      await user.save();

      const token = jsonwebtoken.sign(
         { data: user._id },
         process.env.TOKEN_SECRET,
         { expiresIn: "24h" }
      );
      responseHandler.created(res, {
         token,
         ...user._doc,
         id: user.id,
      });
   } catch (error) {
      responseHandler.error(res);
   }
};

const signin = async (req, res) => {
   try {
      const { username, password } = req.body;
      const user = await adminModel
         .findOne({ username })
         .select("username password");
      if (!user) {
         return responseHandler.badrequest(res, "User not exist");
      }
      if (!bcrypt.compareSync(password, user.password)) {
         return responseHandler.badrequest(res, "Wrong password");
      }
      user.password = undefined;
      const token = jsonwebtoken.sign(
         { data: user._id },
         process.env.TOKEN_SECRET,
         { expiresIn: "24h" }
      );
      responseHandler.created(res, {
         token,
         ...user._doc,
         id: user.id,
      });
   } catch (error) {
      responseHandler.error(res);
   }
};

const getInfo = async (req, res) => {
   try {
      const user = await adminModel.findById(req.user.id);
      if (!user) {
         return responseHandler.unauthoriza(res);
      }

      responseHandler.ok(res, user);
   } catch (error) {
      responseHandler.error(res);
   }
};

export default { signin, signup, getInfo };
