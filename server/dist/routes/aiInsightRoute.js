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
const express_1 = __importDefault(require("express"));
const generative_ai_1 = require("@google/generative-ai");
const fieldModel_1 = __importDefault(require("../models/fieldModel"));
const types_1 = require("../types/types");
const aiInsightRouter = express_1.default.Router();
aiInsightRouter.get("/ask-ai/:fieldId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fieldId } = req.params;
        const field = yield fieldModel_1.default.findById(fieldId);
        if (!field) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "Field is not found",
            });
        }
        const genAI = new generative_ai_1.GoogleGenerativeAI(`${process.env.GOOGLEAI_API}`);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `
        Analyze the following agricultural data:
        Soil Type: ${field.soilType}
        Crop Type: ${field.cropType}
        Crop Health: ${field.cropHealth}.
        Provide insights on:
        1. Soil health (nutrients, pH, moisture).
        2. Crop health (pests, growth stage, yield prediction).
        3. Recommendations for improvements.
        Give concise responses, with only two points in each area.
      `;
        const result = yield model.generateContent(prompt);
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "AI has replied",
            insights: result.response.text(),
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
}));
exports.default = aiInsightRouter;
