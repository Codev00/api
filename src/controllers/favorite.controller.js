import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";

const addFavorite = async (req, res) => {
   try {
      const { mediaId } = req.body;
      const userId = req.user._id;
      console.log(req.user);

      const user = await userModel.findById(userId);

      if (!user) {
         return responseHandler.notfound(res);
      }

      await user.updateOne({ $push: { favorites: mediaId } });

      responseHandler.created(res);
   } catch (error) {
      responseHandler.error(res);
   }
};

const removeFavorite = async (req, res) => {
   try {
      console.log(req.user);
      const id = req.params.id;

      const userId = req.user._id;

      const user = await userModel.findById(userId);

      const favorite = user.favorites.includes(id);
      if (!favorite) {
         return responseHandler.notfound(res);
      }
      await user.updateOne({ $pull: { favorites: id } });
      responseHandler.ok(res);
   } catch (error) {
      console.log(error);
      responseHandler.error(res);
   }
};

export default {
   addFavorite,
   removeFavorite,
};
