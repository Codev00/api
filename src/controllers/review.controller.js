import movieModel from "../models/movie.model.js";
import reviewModel from "../models/review.model.js";
import responseHandler from "../handlers/response.handler.js";

const created = async (req, res) => {
   try {
      const { mediaId, userId, review } = req.body;
      const reviewObj = new reviewModel({
         userId: userId,
         review: review,
      });
      const movie = await movieModel.findById(mediaId);
      await movie.updateOne({ $push: { reviews: reviewObj._id } });
      await reviewObj.save();
      responseHandler.created(res, reviewObj);
   } catch (error) {
      responseHandler.error(res);
   }
};

const updated = async (req, res) => {
   try {
      const { review } = req.body;
      const id = req.params.id;
      const reviewObj = await reviewModel.findByIdAndUpdate(id, {
         review: review,
      });

      responseHandler.ok(res, reviewObj);
   } catch (error) {
      console.log(error);
      responseHandler.error(res);
   }
};

const deleted = async (req, res) => {
   try {
      const id = req.params.id;
      const { mediaId } = req.body;
      const movie = await movieModel.findById(mediaId);
      await movie.updateOne({ $pull: { reviews: id } });
      await reviewModel.findByIdAndDelete(id);
      responseHandler.ok(res);
   } catch (error) {
      console.log(error);
      responseHandler.error(res);
   }
};

export default { created, updated, deleted };
