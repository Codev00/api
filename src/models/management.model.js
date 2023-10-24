import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options";

const managementSchema = new mongoose.Schema({
   access_times: {
      type: Number,
      default: 0,
   },
   admin: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
   },
   user: [
      {
         type: Schema.Types.ObjectId,
         ref: "User",
      },
   ],
});

const managementModel = mongoose.Schema("Management", managementSchema);
export default managementModel;
