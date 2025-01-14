import express from "express";

import { CustomUserReq, statusCode } from "../types/types";
import Transaction from "../models/transactionModel";
import verifyToken from "../middleware/verifyToken";
import isAdmin from "../middleware/isAdmin";
import {
  getAllTransactions,
  getUserTransactions,
  stripePay,
} from "../controllers/paymentController";

const paymentRouter = express.Router();

// stipe payment gateway route
paymentRouter.post("/create-checkout-session", stripePay);

// to get all the transaction that happens in the app - admin route
paymentRouter.get("/transactions/all", isAdmin, getAllTransactions);

// to get user transaction
paymentRouter.get("/transactions", getUserTransactions);

export default paymentRouter;
