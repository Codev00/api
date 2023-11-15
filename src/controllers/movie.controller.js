import movieModel from "../models/movie.model.js";
import videoModel from "../models/video.model.js";
import responseHandler from "../handlers/response.handler.js";

const created = async (req, res) => {
   try {
      console.log("created");
      const {
         name,
         type,
         backdrop_path,
         poster_path,
         overview,
         runtime,
         views,
         release_date,
         direction,
         country,
         actor,
         status,
         genres,
         year,
         quality,
      } = req.body;

      const movie = new movieModel({
         name,
         type,
         backdrop_path,
         poster_path,
         overview,
         runtime,
         views,
         release_date,
         direction,
         country,
         actor,
         status,
         genres,
         year,
         quality,
      });
      await movie.save();
      responseHandler.created(res, movie);
   } catch (error) {
      responseHandler.error(res);
   }
};

const getAllMovies = async (req, res) => {
   try {
      const movies = await movieModel
         .find({ censorship: true })
         .populate(["rating", "reviews"])
         .populate(["genres", "videos"])
         .exec();
      responseHandler.ok(res, movies);
   } catch (error) {
      responseHandler.error(res);
   }
};

const listCensorship = async (req, res) => {
   try {
      const movies = await movieModel
         .find({ censorship: false })
         .populate(["rating", "reviews"])
         .populate(["genres", "videos"])
         .exec();
      responseHandler.ok(res, movies);
   } catch (error) {
      responseHandler.error(res);
   }
};

const getMovie = async (req, res) => {
   try {
      const id = req.params.id;
      console.log(id);
      const movie = await movieModel
         .findById(id)
         .populate(["rating", "reviews"])
         .populate(["genres", "videos"])
         .exec();
      responseHandler.ok(res, movie);
   } catch (error) {
      console.log(error);
      responseHandler.error(res);
   }
};

const searchMovie = async (req, res) => {
   try {
      const { search } = req.query;
      const movies = await movieModel.find({
         name: { $regex: ".*" + search + ".*", $options: "i" },
      });
      responseHandler.ok(res, movies);
   } catch (error) {
      responseHandler.error(res);
   }
};

const edited = async (req, res) => {
   try {
      const id = req.params.id;
      const {
         name,
         type,
         backdrop_path,
         poster_path,
         overview,
         runtime,
         views,
         release_date,
         direction,
         country,
         actor,
         status,
         genres,
         year,
         quality,
         censorship,
      } = req.body;
      const movie = await movieModel.findByIdAndUpdate(id, {
         name,
         type,
         backdrop_path,
         poster_path,
         overview,
         runtime,
         views,
         release_date,
         direction,
         country,
         actor,
         status,
         genres,
         year,
         quality,
         censorship,
      });

      responseHandler.created(res, movie);
   } catch (error) {
      responseHandler.error(res);
   }
};

const changeCensorship = async (req, res) => {
   try {
      const id = req.params.id;
      const { censorship } = req.body;
      const movie = await movieModel.findById(id);
      await movie.updateOne({ censorship });
      responseHandler.ok(res, movie);
   } catch (error) {
      responseHandler.error(res);
   }
};

const deleted = async (req, res) => {
   try {
      const id = req.params.id;
      await movieModel.findByIdAndDelete(id);
      responseHandler.ok(res);
   } catch (error) {
      responseHandler.error(res);
   }
};

const searchMovieGenre = async (req, res) => {
   try {
      const { search } = req.query;
      const data = await movieModel.find({ genres: { _id: search } });
      responseHandler.ok(res, data);
   } catch (error) {
      responseHandler.error(res);
   }
};

export default {
   created,
   getAllMovies,
   getMovie,
   searchMovie,
   edited,
   deleted,
   searchMovieGenre,
   listCensorship,
   changeCensorship,
};
