import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Field from "../models/fieldModel";
import { statusCode } from "../types/types";

const aiInsightRouter = express.Router();

aiInsightRouter.get("/ask-ai/:fieldId", async (req, res) => {
  try {
    const { fieldId } = req.params;

    const field = await Field.findById(fieldId);

    if (!field) {
      res.status(statusCode.NOT_FOUND).json({
        success: false,
        message: "Field is not found",
      });
    }
    const genAI = new GoogleGenerativeAI(`${process.env.GOOGLEAI_API}`);
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

    const result = await model.generateContent(prompt);

    res.status(statusCode.OK).json({
      success: true,
      message: "AI has replied",
      insights: result.response.text(),
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

export default aiInsightRouter;
