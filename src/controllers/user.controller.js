import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import bcrypt from "bcrypt";
const saltRounds = 10;

const signup = async (req, res) => {
   try {
      const { username, password } = req.body;

      const checkUser = await userModel.findOne({ username: username });

      if (checkUser) {
         return responseHandler.badrequest(res, "User already exists");
      }
      const user = new userModel();
      user.displayName = username;
      user.username = username;
      const salt = bcrypt.genSaltSync(saltRounds);
      user.password = bcrypt.hashSync(password, salt);

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

      const user = await userModel
         .findOne({ username })
         .select("username password display name");

      if (!user) {
         return responseHandler.badrequest(res, "User not exist");
      }
      if (!bcrypt.compareSync(password, user.password)) {
         return responseHandler.badrequest(res, "Wrong password");
      }

      const token = jsonwebtoken.sign(
         { data: user._id },
         process.env.TOKEN_SECRET,
         { expiresIn: "24h" }
      );

      user.password = undefined;
      // user.salt = undefined;

      responseHandler.created(res, {
         token,
         ...user._doc,
         id: user.id,
      });
   } catch (error) {
      responseHandler.error(res);
   }
};

const updatePassword = async (req, res) => {
   try {
      const { password, newPassword } = req.body;

      const user = await userModel.findById(req.user.id).select("password");

      if (!user) {
         return responseHandler.unauthoriza(res);
      }
      if (!user.validpassword(password)) {
         return responseHandler.badrequest(res, "Wrong password");
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      user.password = bcrypt.hashSync(password, salt);

      await user.save();
      responseHandler.ok(res);
   } catch (error) {
      responseHandler.error(res);
   }
};

const getInfo = async (req, res) => {
   try {
      const user = await userModel
         .findById(req.user.id)
         .populate(["favorites"])
         .exec();
      if (!user) {
         return responseHandler.unauthoriza(res);
      }

      responseHandler.ok(res, user);
   } catch (error) {
      console.log(error);
      responseHandler.error(res);
   }
};

const listUser = async (req, res) => {
   try {
      const users = await userModel.find({}).populate(["favorites"]).exec();
      responseHandler.ok(res, users);
   } catch (error) {
      responseHandler.error(res);
   }
};

const getUser = async (req, res) => {
   try {
      const user = await userModel.findById(req.params.userId).exec();
      responseHandler.ok(res, user);
   } catch (error) {
      responseHandler.error(res);
   }
};

export default {
   signup,
   signin,
   updatePassword,
   getInfo,
   listUser,
   getUser,
};
