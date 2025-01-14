import express from "express";
import verifyToken from "../middleware/verifyToken";
import getAiInsights from "../controllers/aiInsightController";

const aiInsightRouter = express.Router();

// google gemini AI route
aiInsightRouter.get("/ask-ai/:fieldId", verifyToken, getAiInsights);

export default aiInsightRouter;
