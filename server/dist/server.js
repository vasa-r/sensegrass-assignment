"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connectDb_1 = __importDefault(require("./config/connectDb"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const fieldRoute_1 = __importDefault(require("./routes/fieldRoute"));
const aiInsightRoute_1 = __importDefault(require("./routes/aiInsightRoute"));
const paymentRoute_1 = __importDefault(require("./routes/paymentRoute"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.get("/ping", (_, res) => {
    res.json({
        success: true,
        message: "API up and running",
    });
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/user", userRoute_1.default);
app.use("/api/field", fieldRoute_1.default);
app.use("/api/ai", aiInsightRoute_1.default);
app.use("/api/payment", paymentRoute_1.default);
app.use("*", (_, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint not found",
    });
});
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    (0, connectDb_1.default)();
});
