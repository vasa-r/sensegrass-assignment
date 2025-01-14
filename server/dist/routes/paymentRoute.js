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
const stripe_1 = __importDefault(require("stripe"));
const types_1 = require("../types/types");
const transactionModel_1 = __importDefault(require("../models/transactionModel"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const isAdmin_1 = __importDefault(require("../middleware/isAdmin"));
const stripe = new stripe_1.default(`${process.env.STRIPE_SECRET}`);
const paymentRouter = express_1.default.Router();
paymentRouter.post("/create-checkout-session", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req;
    console.log(userId);
    const { price } = req.body;
    try {
        const lineItems = [
            {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: "Agri Service",
                    },
                    unit_amount: Math.round(price * 100),
                },
                quantity: 1,
            },
        ];
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.BASE_URL}/success`,
            cancel_url: `${process.env.BASE_URL}/cancel`,
        });
        const newTransaction = yield transactionModel_1.default.create({ userId, price });
        res.status(types_1.statusCode.OK).json({ id: session.id });
    }
    catch (error) {
        console.error(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Something went wrong while making payments",
        });
        return;
    }
}));
paymentRouter.get("/transactions/all", verifyToken_1.default, isAdmin_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield transactionModel_1.default.find({});
        if (!transactions || transactions.length < 1) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "No transactions yet",
            });
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Transactions fetched",
            transactions,
        });
    }
    catch (error) {
        console.error(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Something went wrong while making payments",
        });
        return;
    }
}));
paymentRouter.get("/transactions", verifyToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req;
        const transactions = yield transactionModel_1.default.find({ userId });
        if (!transactions || transactions.length < 1) {
            res.status(types_1.statusCode.NOT_FOUND).json({
                success: false,
                message: "No transactions yet",
            });
        }
        res.status(types_1.statusCode.OK).json({
            success: true,
            message: "Transactions fetched",
            transactions,
        });
    }
    catch (error) {
        console.error(error);
        res.status(types_1.statusCode.SERVER_ERROR).json({
            success: false,
            message: "Something went wrong while making payments",
        });
        return;
    }
}));
exports.default = paymentRouter;
