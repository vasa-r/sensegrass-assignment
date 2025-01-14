import express from "express";
import verifyToken from "../middleware/verifyToken";
import Field from "../models/fieldModel";
import { CustomUserReq, statusCode } from "../types/types";
import isAdmin from "../middleware/isAdmin";
import validateField from "../middleware/validateNewField";

const fieldRouter = express.Router();

fieldRouter.get("/all", verifyToken, isAdmin, async (req, res) => {
  try {
    const fields = await Field.find({}).lean();

    if (!fields || fields.length < 1) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "No Fields available",
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      message: "Fields fetched successfully",
      fields,
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while getting fields",
    });
    return;
  }
});

fieldRouter.get("/", verifyToken, async (req: CustomUserReq, res) => {
  const { userId } = req;
  try {
    const fields = await Field.find({ user: userId }).lean();

    if (!fields || fields.length < 1) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "No Fields available",
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      message: "Fields fetched successfully",
      fields,
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while getting fields",
    });
    return;
  }
});

fieldRouter.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const fields = await Field.findOne({ _id: id }).lean();

    if (!fields || fields.length < 1) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "No Field found",
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      message: "Field fetched successfully",
      fields,
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while getting field",
    });
    return;
  }
});

fieldRouter.post(
  "/create",
  verifyToken,
  validateField,
  async (req: CustomUserReq, res) => {
    try {
      const { userId } = req;
      const {
        fieldName,
        location,
        latitude,
        longitude,
        cropType,
        fieldArea,
        plantingDate,
        harvestingDate,
        soilType,
        inputCost,
        revenue,
        cropHealth,
      } = req.body;

      const createField = await Field.create({
        fieldName,
        location,
        latitude,
        longitude,
        cropType,
        fieldArea,
        plantingDate,
        harvestingDate,
        soilType,
        inputCost,
        revenue,
        cropHealth,
        user: userId,
      });

      if (!createField) {
        res.status(statusCode.NOT_IMPLEMENTED).json({
          success: false,
          message: "Not added. Please try again later",
        });
        return;
      }

      res.status(statusCode.CREATED).json({
        success: true,
        message: "Field added successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(statusCode.SERVER_ERROR).json({
        success: false,
        message: "Something went wrong while adding field",
      });
      return;
    }
  }
);

fieldRouter.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const updatedField = await Field.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedField) {
      res.status(statusCode.NOT_IMPLEMENTED).json({
        success: false,
        message: "Failed to update field",
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      message: "Field updated successfully",
      data: updatedField,
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while updating field",
    });
    return;
  }
});

fieldRouter.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const deleteField = await Field.findByIdAndDelete(id);

    if (!deleteField) {
      res.status(statusCode.NOT_IMPLEMENTED).json({
        success: false,
        message: "Failed to delete field",
      });
      return;
    }

    res.status(statusCode.OK).json({
      success: true,
      message: "Field deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(statusCode.SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while deleting field",
    });
    return;
  }
});

export default fieldRouter;
