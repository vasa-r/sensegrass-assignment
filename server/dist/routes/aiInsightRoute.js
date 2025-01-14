"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const aiInsightController_1 = __importDefault(require("../controllers/aiInsightController"));
const aiInsightRouter = express_1.default.Router();
// google gemini AI route
aiInsightRouter.get("/ask-ai/:fieldId", verifyToken_1.default, aiInsightController_1.default);
exports.default = aiInsightRouter;
