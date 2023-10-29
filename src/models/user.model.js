import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

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
      email: {
         type: String,
      },
      verify: {
         type: Boolean,
      },
      status: {
         type: Boolean,
         default: false,
      },
      favorites: [
         {
            type: Schema.Types.ObjectId,
            ref: "Movie",
         },
      ],
   },
   modelOptions
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
