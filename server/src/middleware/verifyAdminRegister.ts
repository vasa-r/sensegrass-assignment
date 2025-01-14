import { NextFunction, Request, Response } from "express";
import { statusCode } from "../types/types";

const verifyAdminRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role, referralCode } = req.body;
    if (role === "farmer") {
      next();
    } else if (role === "admin" && referralCode === process.env.REFERRAL_CODE) {
      next();
    } else {
      res
        .status(statusCode.UNAUTHORIZED)
        .json({ success: false, message: "Unauthorized to register as admin" });
      return;
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export default verifyAdminRegister;
