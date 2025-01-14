import express from "express";
import Stripe from "stripe";
import { CustomUserReq, statusCode } from "../types/types";
import Transaction from "../models/transactionModel";
import verifyToken from "../middleware/verifyToken";
import isAdmin from "../middleware/isAdmin";
const stripe = new Stripe(`${process.env.STRIPE_SECRET}`);

const paymentRouter = express.Router();

paymentRouter.post(
  "/create-checkout-session",
  verifyToken,
  async (req: CustomUserReq, res) => {
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

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.BASE_URL}/success`,
        cancel_url: `${process.env.BASE_URL}/cancel`,
      });

      const newTransaction = await Transaction.create({ userId, price });

      res.status(statusCode.OK).json({ id: session.id });
    } catch (error) {
      console.error(error);
      res.status(statusCode.SERVER_ERROR).json({
        success: false,
        message: "Something went wrong while making payments",
      });
      return;
    }
  }
);

paymentRouter.get(
  "/transactions/all",
  verifyToken,
  isAdmin,
  async (req: CustomUserReq, res) => {
    try {
      const transactions = await Transaction.find({});

      if (!transactions || transactions.length < 1) {
        res.status(statusCode.NOT_FOUND).json({
          success: false,
          message: "No transactions yet",
        });
      }

      res.status(statusCode.OK).json({
        success: true,
        message: "Transactions fetched",
        transactions,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCode.SERVER_ERROR).json({
        success: false,
        message: "Something went wrong while making payments",
      });
      return;
    }
  }
);

paymentRouter.get(
  "/transactions",
  verifyToken,
  async (req: CustomUserReq, res) => {
    try {
      const { userId } = req;
      const transactions = await Transaction.find({ userId });

      if (!transactions || transactions.length < 1) {
        res.status(statusCode.NOT_FOUND).json({
          success: false,
          message: "No transactions yet",
        });
      }

      res.status(statusCode.OK).json({
        success: true,
        message: "Transactions fetched",
        transactions,
      });
    } catch (error) {
      console.error(error);
      res.status(statusCode.SERVER_ERROR).json({
        success: false,
        message: "Something went wrong while making payments",
      });
      return;
    }
  }
);

export default paymentRouter;
