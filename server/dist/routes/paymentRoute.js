"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAdmin_1 = __importDefault(require("../middleware/isAdmin"));
const paymentController_1 = require("../controllers/paymentController");
const paymentRouter = express_1.default.Router();
// stipe payment gateway route
paymentRouter.post("/create-checkout-session", paymentController_1.stripePay);
// to get all the transaction that happens in the app - admin route
paymentRouter.get("/transactions/all", isAdmin_1.default, paymentController_1.getAllTransactions);
// to get user transaction
paymentRouter.get("/transactions", paymentController_1.getUserTransactions);
exports.default = paymentRouter;
