import managementModel from "../models/management.model";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler";
import bcrypt from "bcrypt";

const created = async (req, res) => {
   try {
      const manager = new managementModel({
         access_times: 0,
         total_access_times: 0,
      });

      await manager.save();
      responseHandler.created(res, {
         ...manager._doc,
         id: manager.id,
      });
   } catch (error) {}
};
