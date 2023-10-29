import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
   "Favorite",
   mongoose.Schema(
      {
         user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
         },
         mediaType: {
            type: String,
         },
         mediaId: {
            type: Schema.Types.ObjectId,
            ref: "Movie",
         },
         mediaName: {
            type: String,
            required: true,
         },
         poster_path: {
            type: String,
            required: true,
         },
      },
      modelOptions
   )
);
