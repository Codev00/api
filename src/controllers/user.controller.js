import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import bcrypt from "bcrypt";
import nodeMailer from "nodemailer";
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
      user.password = bcrypt.hashSync(newPassword, salt);

      await user.save();
      responseHandler.ok(res);
   } catch (error) {
      responseHandler.error(res);
   }
};

const forgotPassword = async (req, res) => {
   try {
      const { email } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
         return responseHandler.unauthoriza(res);
      }
      const data = user._id + email;
      const token = jsonwebtoken.sign({ data }, process.env.TOKEN_SECRET, {
         expiresIn: "5m",
      });
      user.verify = data;
      await user.save();

      const transporter = nodeMailer.createTransport({
         service: "gmail",
         auth: {
            user: "codev285@gmail.com",
            pass: "snqm qfee uqvu nfoh",
         },
         secure: true,
      });

      const mailOptions = {
         from: "codev285@gmail.com",
         to: email,
         subject: "Sending Email using Node.js",
         text: "That was easy!",
         html: `<div>
            <p>
               Chúng tôi nhận được yêu cầu reset
               mật khẩu tài khoản Gmail của bạn. Nếu bạn không yêu cầu reset mật
               khẩu, vui lòng bỏ qua email này và không thực hiện bất kỳ hành
               động nào. Tài khoản của bạn vẫn an toàn. Nếu bạn đang cố gắng
               truy cập tài khoản của mình, hãy nhấp vào liên kết bên dưới để
               đặt lại mật khẩu:
               <h3>
                  <a href="http://localhost:3000/forgot-password/reset-password?email=${email}&token=${token}">RESET PASSWORD</a>
               </h3>
               Liên kết trên chỉ có hiệu lực trong vòng 5 phút tính từ lúc gửi
               email này. Sau thời gian đó, bạn cần yêu cầu reset mật khẩu mới.
               Cảm ơn bạn đã sử dụng dịch vụ xem phim Matrix. Chúc bạn một ngày tốt lành!
            </p>
         </div>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
         if (error) {
            console.log(error);
            responseHandler.error(res);
         } else {
            console.log("Email sent: " + info.response);
            responseHandler.ok(res);
         }
      });
   } catch (error) {
      console.log(error);
      responseHandler.error(res);
   }
};

const resetPassword = async (req, res) => {
   try {
      const { password, email, token } = req.body;

      const user = await userModel.findOne({ email });
      if (!user) {
         return responseHandler.unauthoriza(res);
      }
      if (
         user.verify !==
         jsonwebtoken.verify(token, process.env.TOKEN_SECRET).data
      ) {
         return responseHandler.badrequest(res, "Wrong token");
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(password, salt);
      user.password = hash;
      await user.save();
      responseHandler.ok(res);
   } catch (error) {
      console.log(error);
      responseHandler.error(res);
   }
};

const getInfo = async (req, res) => {
   try {
      const user = await userModel
         .findById(req.user.id)
         .populate(["favorites", "payment"])
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

const editUser = async (req, res) => {
   try {
      const id = req.params.id;
      const { name, password, newPassword, email } = req.body;
      const user = await userModel.findById(id).select("password displayName");
      if (!user) {
         return responseHandler.unauthoriza(res);
      }
      if (password) {
         if (!bcrypt.compareSync(password, user.password)) {
            return responseHandler.badrequest(res, "Wrong password");
         } else {
            const salt = bcrypt.genSaltSync(saltRounds);
            user.password = bcrypt.hashSync(newPassword, salt);
         }
      }
      if (name) {
         user.displayName = name;
      }
      if (email) {
         user.email = email;
      }
      await user.save();
      user.password = undefined;
      responseHandler.ok(res, user);
   } catch (error) {
      console.log("edit");
      console.log(error);
      responseHandler.error(res);
   }
};

export default {
   signup,
   signin,
   updatePassword,
   resetPassword,
   forgotPassword,
   getInfo,
   listUser,
   getUser,
   editUser,
};
