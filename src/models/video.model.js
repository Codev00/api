import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

const videoSchema = new mongoose.Schema({
   key: {
      type: String,
      required: true,
   },
   movie: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
   },
});

const videoModel = mongoose.model("Video", videoSchema);
export default videoModel;
