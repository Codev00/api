import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

const movieSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      year: {
         type: Number,
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
      quality: {
         type: String,
         default: "HD",
      },
      premium: {
         type: Boolean,
         default: false,
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
      status: {
         type: String,
         default: "released",
      },
      censorship: {
         type: Boolean,
         default: false,
      },
      genres: [
         {
            type: Schema.Types.ObjectId,
            ref: "Genre",
         },
      ],
      videos: [
         {
            type: Schema.Types.ObjectId,
            ref: "Video",
         },
      ],
      rating: [
         {
            type: Schema.Types.ObjectId,
            ref: "Rate",
         },
      ],
      reviews: [
         {
            type: Schema.Types.ObjectId,
            ref: "Review",
         },
      ],
   },
   modelOptions
);

const movieModel = mongoose.model("Movie", movieSchema);
export default movieModel;
