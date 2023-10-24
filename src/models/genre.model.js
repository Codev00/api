import mongoose from "mongoose";
import modelOptions from "./model.options.js";

const genreSchema = new mongoose.Schema(
   {
      id: {
         type: Number,
         unique: true,
      },
      title: {
         type: String,
         required: true,
      },
   },
   modelOptions
);

const genreModel = mongoose.model("Genre", genreSchema);
export default genreModel;
