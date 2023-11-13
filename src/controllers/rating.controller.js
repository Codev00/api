import rateModel from "../models/rating.model.js";
import movieModel from "../models/movie.model.js";

const created = async (req, res) => {
   try {
      const { mediaId, userId, rating } = req.body;
      const ratingObj = new rateModel({
         mediaId: mediaId,
         userId: userId,
         rating: rating,
      });
      const movie = await movieModel.findById(mediaId);
      movie.rating.push(ratingObj._id);
      await ratingObj.save();
      responseHandler.created(res, ratingObj);
   } catch (error) {
      responseHandler.error(res);
   }
};

const update = async (req, res) => {
   try {
      const { mediaId, userId, rating } = req.body;
      const ratingObj = await rateModel.findOneAndUpdate(
         { mediaId: mediaId, userId: userId },
         { rating: rating }
      );
      responseHandler.ok(res, ratingObj);
   } catch (error) {
      responseHandler.error(res);
   }
};

export default { created, update };
