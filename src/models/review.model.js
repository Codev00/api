import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

const reviewSchema = new mongoose.Schema(
   {
      mediaId: {
         type: Schema.Types.ObjectId,
         ref: "Movie",
      },
      userId: {
         type: Schema.Types.ObjectId,
         ref: "User",
      },
      review: {
         type: String,
      },
   },
   modelOptions
);

const reviewModel = mongoose.model("Review", reviewSchema);
export default reviewModel;
