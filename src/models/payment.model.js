import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

const paymentSchema = new mongoose.Schema(
   {
      amount: {
         type: Number,
         required: true,
      },
      userId: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
   },
   modelOptions
);

const paymentModel = mongoose.model("Payment", paymentSchema);
export default paymentModel;
