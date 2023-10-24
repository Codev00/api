import genreModel from "../models/genre.model.js";
import responseHandler from "../handlers/response.handler.js";

const created = async (req, res) => {
   try {
      const { id, title } = req.body;
      const genre = new genreModel({ id: id, title: title });
      await genre.save();

      responseHandler.created(res, genre);
   } catch (error) {
      responseHandler.error(res);
   }
};

const getList = async (req, res) => {
   try {
      const genres = await genreModel.find({});
      responseHandler.ok(res, genres);
   } catch (error) {
      responseHandler.error(res);
   }
};

const edited = async (req, res) => {
   try {
      const id = req.params.id;
      const { title } = req.body;
      const genre = await genreModel.findByIdAndUpdate(id, title);
      responseHandler.ok(res, genre);
   } catch (error) {
      responseHandler.error(res);
   }
};

const deleted = async (req, res) => {
   try {
      const id = req.params.id;
      const data = await genreModel.findByIdAndDelete(id);
      responseHandler.ok(res, data);
   } catch (error) {
      responseHandler.error(res);
   }
};

export default { created, edited, getList, deleted };
