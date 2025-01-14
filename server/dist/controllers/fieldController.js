"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteField = exports.updateField = exports.createField = exports.getField = exports.getUserFields = exports.getAllFields = void 0;
const fieldModel_1 = __importDefault(require("../models/fieldModel"));
const types_1 = require("../types/types");
const getAllFields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fields = yield fieldModel_1.default.find({}).lean();
        if (!fields || fields.length < 1) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "No Fields available",
            });
            return;
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Fields fetched successfully",
            fields,
        });
    }
    catch (error) {
        console.error(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Something went wrong while getting fields",
        });
        return;
    }
});
exports.getAllFields = getAllFields;
const getUserFields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    try {
        const fields = yield fieldModel_1.default.find({ user: userId }).lean();
        if (!fields || fields.length < 1) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "No Fields available",
            });
            return;
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Fields fetched successfully",
            fields,
        });
    }
    catch (error) {
        console.error(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Something went wrong while getting fields",
        });
        return;
    }
});
exports.getUserFields = getUserFields;
const getField = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const fields = yield fieldModel_1.default.findOne({ _id: id }).lean();
        if (!fields || fields.length < 1) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "No Field found",
            });
            return;
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Field fetched successfully",
            fields,
        });
    }
    catch (error) {
        console.error(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Something went wrong while getting field",
        });
        return;
    }
});
exports.getField = getField;
const createField = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req;
        const { fieldName, location, latitude, longitude, cropType, fieldArea, plantingDate, harvestingDate, soilType, inputCost, revenue, cropHealth, } = req.body;
        const createField = yield fieldModel_1.default.create({
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
            res.status(types_1.statusCode.NOT_IMPLEMENTED).json({
                success: false,
                message: "Not added. Please try again later",
            });
            return;
        }
        res.status(types_1.statusCode.CREATED).json({
            success: true,
            message: "Field added successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Something went wrong while adding field",
        });
        return;
    }
});
exports.createField = createField;
const updateField = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedField = yield fieldModel_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedField) {
            res.status(types_1.statusCode.NOT_IMPLEMENTED).json({
                success: false,
                message: "Failed to update field",
            });
            return;
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Field updated successfully",
            data: updatedField,
        });
    }
    catch (error) {
        console.error(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Something went wrong while updating field",
        });
        return;
    }
});
exports.updateField = updateField;
const deleteField = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteField = yield fieldModel_1.default.findByIdAndDelete(id);
        if (!deleteField) {
            res.status(types_1.statusCode.NOT_IMPLEMENTED).json({
                success: false,
                message: "Failed to delete field",
            });
            return;
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Field deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Something went wrong while deleting field",
        });
        return;
    }
});
exports.deleteField = deleteField;
