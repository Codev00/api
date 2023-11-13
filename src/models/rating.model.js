import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

const ratingSchema = new mongoose.Schema(
   {
      mediaId: {
         type: Schema.Types.ObjectId,
         ref: "Movie",
      },
      userId: {
         type: Schema.Types.ObjectId,
         ref: "User",
      },
      rating: {
         type: Number,
      },
   },
   modelOptions
);

const rateModel = mongoose.model("Rate", ratingSchema);
export default rateModel;
