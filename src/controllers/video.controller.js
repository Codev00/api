import videoModel from "../models/video.model.js";
import movieModel from "../models/movie.model.js";
import responseHandler from "../handlers/response.handler.js";

const created = async (req, res) => {
   try {
      const { id, key, title } = req.body;
      const video = new videoModel({ title: title, key: key, movie: id });
      await video.save();
      const movie = await movieModel.findById(id);
      await movie.updateOne({ $push: { videos: video._id } });
      responseHandler.created(res, video);
   } catch (error) {
      responseHandler.error(res);
   }
};

const deleted = async (req, res) => {
   try {
      const id = req.params.id;
      const data = videoModel.findByIdAndDelete(id);
      responseHandler.ok(res, data);
   } catch (error) {
      responseHandler.error(res);
   }
};

export default { deleted, created };
