import mongoose, { Schema, now } from "mongoose";
import modelOptions from "./model.options.js";

const movieSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      eng_name: {
         type: String,
         required: true,
      },
      type: {
         type: String,
      },
      backdrop_path: {
         type: String,
      },
      poster_path: {
         type: String,
      },
      overview: {
         type: String,
         required: true,
      },
      runtime: {
         type: Number,
      },
      views: {
         type: Number,
         default: 0,
      },
      release_date: {
         type: String,
      },
      direction: [
         {
            type: String,
         },
      ],
      country: {
         type: String,
      },
      actor: [
         {
            type: String,
         },
      ],
      vote_point: {
         type: Number,
      },
      vote_total: {
         type: Number,
         default: 0,
      },
      status: {
         type: String,
         enum: ["Release", "Commingsoon"],
      },
      genres: [
         {
            type: Schema.Types.Number,
            ref: "Genre",
         },
      ],
      videos: [
         {
            type: Schema.Types.ObjectId,
            ref: "Video",
         },
      ],
   },
   modelOptions
);

const movieModel = mongoose.model("Movie", movieSchema);
export default movieModel;
