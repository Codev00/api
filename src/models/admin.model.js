import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

const adminSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
   },
   modelOptions
);

const adminModel = mongoose.model("Admin", adminSchema);
export default adminModel;
