import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options";

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
      manager: {
         type: Schema.Types.Schema,
         ref: "Management",
      },
   },
   modelOptions
);

const adminModel = mongoose.Schema("Admin", adminSchema);
export default adminModel;
