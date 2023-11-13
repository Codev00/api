import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

const reviewSchema = new mongoose.Schema(
   {
      userId: {
         type: Schema.Types.ObjectId,
         ref: "User",
      },
      review: {
         type: string,
      },
   },
   modelOptions
);

const reviewModel = mongoose.model("Review", reviewSchema);
export default reviewModel;
