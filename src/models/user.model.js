import mongoose from "mongoose";
import modelOptions from "./model.options";

const userSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true,
      },
      displayName: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
         select: false,
      },
   },
   modelOptions
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
