import { Response } from "express";
import Transaction from "../models/transactionModel";
import { CustomUserReq, statusCode } from "../types/types";
import Stripe from "stripe";
const stripe = new Stripe(`${process.env.STRIPE_SECRET}`);

const stripePay = async (req: CustomUserReq, res: Response) => {
  const { userId } = req;

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
};

const getAllTransactions = async (req: CustomUserReq, res: Response) => {
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
};

const getUserTransactions = async (req: CustomUserReq, res: Response) => {
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
};
export { stripePay, getAllTransactions, getUserTransactions };
