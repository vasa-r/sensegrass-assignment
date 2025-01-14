import { Request, Response } from "express";
import Field from "../models/fieldModel";
import { CustomUserReq, statusCode } from "../types/types";

const getAllFields = async (req: Request, res: Response) => {
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
};

const getUserFields = async (req: CustomUserReq, res: Response) => {
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
};

const getField = async (req: Request, res: Response) => {
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
};

const createField = async (req: CustomUserReq, res: Response) => {
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
};

const updateField = async (req: Request, res: Response) => {
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
};

const deleteField = async (req: Request, res: Response) => {
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
};

export {
  getAllFields,
  getUserFields,
  getField,
  createField,
  updateField,
  deleteField,
};
