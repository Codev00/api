import mongoose, { Schema, now } from "mongoose";
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
      quality: {
         type: String,
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
         default: 0,
      },
      vote_total: {
         type: Number,
         default: 0,
      },
      status: {
         type: String,
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
