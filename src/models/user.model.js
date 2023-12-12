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
         default: "",
         unique: true,
      },
      verify: {
         type: String,
         default: "",
      },
      premium: {
         type: Boolean,
         default: false,
      },
      rating: {
         type: Number,
         default: 0,
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
      payment: {
         type: Schema.Types.ObjectId,
         ref: "Payment",
      },
   },
   modelOptions
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
